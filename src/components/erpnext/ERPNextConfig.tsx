
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  initializeERPNext, 
  getERPNextConfig, 
  clearERPNextConfig,
  getDocTypes,
  loginToERPNext
} from '@/services/erpnext/erpnextService';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ERPNextConfig: React.FC = () => {
  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing config on component mount
  useEffect(() => {
    const config = getERPNextConfig();
    if (config) {
      setBaseUrl(config.baseUrl);
      setUsername(config.username);
      setPassword(config.password);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!baseUrl || !username || !password) {
      setError('All fields are required');
      return;
    }

    // Format the base URL properly
    let formattedBaseUrl = baseUrl;
    if (!formattedBaseUrl.startsWith('http')) {
      formattedBaseUrl = `https://${formattedBaseUrl}`;
    }
    if (formattedBaseUrl.endsWith('/')) {
      formattedBaseUrl = formattedBaseUrl.slice(0, -1);
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Initialize the connection first
      initializeERPNext({
        baseUrl: formattedBaseUrl,
        username,
        password
      });

      console.log('Attempting to login to ERPNext via proxy...');
      
      // Perform actual login to establish session through proxy
      await loginToERPNext(username, password);
      
      console.log('Login successful, testing API access...');
      
      // Test the connection by fetching doctypes
      await getDocTypes();
      
      setIsConnected(true);
      toast({
        title: "Connection successful",
        description: "Authenticated and connected to ERPNext instance via proxy.",
      });
    } catch (err) {
      console.error('ERPNext connection failed:', err);
      clearERPNextConfig();
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Failed to connect to ERPNext');
      
      toast({
        title: "Connection failed",
        description: err instanceof Error ? err.message : 'Failed to connect to ERPNext',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    clearERPNextConfig();
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "ERPNext connection has been removed.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ERPNext Integration</CardTitle>
        <CardDescription>
          Connect to your ERPNext instance with username and password authentication (via secure proxy)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">ERPNext URL</Label>
            <Input 
              id="baseUrl"
              type="text"
              placeholder="https://your-erpnext-instance.com"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              disabled={isConnecting || isConnected}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input 
              id="username"
              type="text"
              placeholder="administrator or user@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isConnecting || isConnected}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isConnecting || isConnected}
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500 flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
          
          {isConnected && (
            <div className="text-sm text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Authenticated and connected to ERPNext via secure proxy
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isConnected ? (
          <Button variant="destructive" onClick={handleDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button type="submit" onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting via Proxy...
              </>
            ) : (
              'Connect via Proxy'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ERPNextConfig;
