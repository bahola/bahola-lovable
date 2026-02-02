import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminCheckResult {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
}

export const useAdminCheck = (): AdminCheckResult => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Check Supabase auth session (NOT Swell - admins use Supabase)
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        setUserId(session.user.id);

        // Check admin role via RPC function
        const { data, error: rpcError } = await supabase.rpc('is_admin');

        if (rpcError) {
          console.error('Admin check error:', rpcError);
          setError(rpcError.message);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (err) {
        console.error('Admin check exception:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setUserId(null);
        } else if (session?.user) {
          setUserId(session.user.id);
          const { data } = await supabase.rpc('is_admin');
          setIsAdmin(data === true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, isLoading, error, userId };
};
