
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface AuthModalsProps {
  modalType: 'signin' | 'signup' | null;
  onClose: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ modalType, onClose }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'signup') {
      toast({
        title: "Success!",
        description: "Thank you for signing up! Check your email for a 10% discount code.",
        duration: 5000,
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to your account.",
        duration: 5000,
      });
    }
    onClose();
  };
  
  if (!modalType) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-bahola-neutral-500 hover:text-bahola-neutral-800"
        >
          <X size={24} />
        </button>
        
        {modalType === 'signup' ? (
          <>
            <h2 className="text-2xl font-bold text-bahola-neutral-800 mb-2">Sign up for emails</h2>
            <p className="text-bahola-neutral-600 mb-6">Get 10% off your first order when you sign up for our newsletter!</p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" required />
                  <Label htmlFor="terms" className="text-sm leading-tight">
                    I agree to receive marketing emails and accept the <Link to="/terms-conditions" className="text-bahola-blue-500 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-bahola-blue-500 hover:underline">Privacy Policy</Link>.
                  </Label>
                </div>
                
                <Button type="submit" className="w-full btn-bahola">
                  Get 10% Off
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-bahola-neutral-800 mb-2">Sign in to your account</h2>
            <p className="text-bahola-neutral-600 mb-6">Welcome back! Please enter your details.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="signinEmail">Email</Label>
                  <Input id="signinEmail" type="email" placeholder="you@example.com" required />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-bahola-blue-500 hover:underline">Forgot password?</Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                </div>
                
                <Button type="submit" className="w-full btn-bahola">
                  Sign In
                </Button>
                
                <p className="text-center text-sm text-bahola-neutral-600">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    className="text-bahola-blue-500 hover:underline"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        onClose();
                        // Replace with function to open signup modal
                      }, 100);
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
