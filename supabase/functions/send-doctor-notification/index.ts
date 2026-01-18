import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  doctorEmail: string;
  doctorName: string;
  status: 'approved' | 'rejected';
  adminEmail?: string;
}

const getApprovedEmailHtml = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Congratulations!</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
    <p style="font-size: 16px;">Dear Dr. ${name},</p>
    <p style="font-size: 16px;">We are pleased to inform you that your <strong>doctor account application has been approved!</strong></p>
    <p style="font-size: 16px;">You now have full access to our healthcare professional features, including:</p>
    <ul style="font-size: 16px; color: #374151;">
      <li>Exclusive doctor pricing</li>
      <li>Bulk ordering options</li>
      <li>Access to professional-grade products</li>
      <li>Priority customer support</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://bahola-labs.lovable.app" style="background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Start Shopping</a>
    </div>
    <p style="font-size: 14px; color: #6b7280;">Thank you for choosing Bahola Labs.</p>
    <p style="font-size: 14px; color: #6b7280;">Best regards,<br>The Bahola Labs Team</p>
  </div>
</body>
</html>
`;

const getRejectedEmailHtml = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Application Update</h1>
  </div>
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
    <p style="font-size: 16px;">Dear ${name},</p>
    <p style="font-size: 16px;">Thank you for your interest in registering as a healthcare professional with Bahola Labs.</p>
    <p style="font-size: 16px;">After reviewing your application, we regret to inform you that we are unable to approve your doctor account at this time.</p>
    <p style="font-size: 16px;">This may be due to:</p>
    <ul style="font-size: 16px; color: #374151;">
      <li>Incomplete or unclear documentation</li>
      <li>Unable to verify medical license</li>
      <li>Missing required information</li>
    </ul>
    <p style="font-size: 16px;">If you believe this decision was made in error or if you have additional documentation to provide, please contact our support team.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="mailto:support@baholalabs.in" style="background: #6b7280; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Contact Support</a>
    </div>
    <p style="font-size: 14px; color: #6b7280;">Best regards,<br>The Bahola Labs Team</p>
  </div>
</body>
</html>
`;

const getAdminNotificationHtml = (doctorName: string, doctorEmail: string, status: 'approved' | 'rejected') => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: ${status === 'approved' ? '#10b981' : '#ef4444'}; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 20px;">Doctor Application ${status === 'approved' ? 'Approved' : 'Rejected'}</h1>
  </div>
  <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
    <p><strong>Doctor:</strong> ${doctorName}</p>
    <p><strong>Email:</strong> ${doctorEmail}</p>
    <p><strong>Status:</strong> <span style="color: ${status === 'approved' ? '#10b981' : '#ef4444'}; font-weight: 600;">${status.toUpperCase()}</span></p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
  </div>
</body>
</html>
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { doctorEmail, doctorName, status, adminEmail }: NotificationRequest = await req.json();

    if (!doctorEmail || !doctorName || !status) {
      return new Response(
        JSON.stringify({ error: 'doctorEmail, doctorName, and status are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending ${status} notification to ${doctorEmail}`);

    const emailPromises = [];

    // Send email to doctor
    const doctorEmailHtml = status === 'approved' 
      ? getApprovedEmailHtml(doctorName) 
      : getRejectedEmailHtml(doctorName);

    emailPromises.push(
      resend.emails.send({
        from: 'Bahola Labs <onboarding@resend.dev>',
        to: [doctorEmail],
        subject: status === 'approved' 
          ? '🎉 Your Doctor Account Has Been Approved!' 
          : 'Doctor Account Application Update',
        html: doctorEmailHtml,
      })
    );

    // Send email to admin if provided
    if (adminEmail) {
      emailPromises.push(
        resend.emails.send({
          from: 'Bahola Labs <onboarding@resend.dev>',
          to: [adminEmail],
          subject: `Doctor ${status === 'approved' ? 'Approved' : 'Rejected'}: ${doctorName}`,
          html: getAdminNotificationHtml(doctorName, doctorEmail, status),
        })
      );
    }

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected');

    if (failed.length > 0) {
      console.error('Some emails failed:', failed);
    }

    console.log(`Sent ${successful} of ${results.length} emails successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${successful} of ${results.length} emails`,
        results: results.map((r, i) => ({
          recipient: i === 0 ? doctorEmail : adminEmail,
          status: r.status,
          error: r.status === 'rejected' ? (r as PromiseRejectedResult).reason?.message : undefined
        }))
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-doctor-notification function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
