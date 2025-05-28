
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTexts } from '@/hooks/useTexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const texts = useTexts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, displayName);
        toast({
          title: texts.login.successSignUpTitle,
          description: texts.login.successSignUpDescription,
        });
      } else {
        await signIn(email, password);
        toast({
          title: texts.login.successLoginTitle,
          description: texts.login.successLoginDescription,
        });
      }
    } catch (error: any) {
      toast({
        title: texts.login.errorTitle,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignUp ? texts.login.createAccountTitle : texts.login.title}
          </CardTitle>
          <p className="text-gray-600">
            {isSignUp ? texts.login.createAccountSubtitle : texts.login.subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="displayName">{texts.login.displayNameLabel}</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder={texts.login.displayNamePlaceholder}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{texts.login.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={texts.login.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{texts.login.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                placeholder={texts.login.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? texts.login.loadingText : (isSignUp ? texts.login.createAccountButton : texts.login.loginButton)}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isSignUp ? texts.login.switchToLogin : texts.login.switchToSignUp}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
