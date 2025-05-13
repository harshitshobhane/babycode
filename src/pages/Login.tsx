
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, MOCK_EMAIL, MOCK_PASSWORD } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Key, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      // Provide a more user-friendly error message
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === 'auth/api-key-not-valid') {
        setError("Authentication service error. Try using the One-Click Login button instead.");
      } else {
        setError(err.message || "Failed to log in");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail(MOCK_EMAIL);
    setPassword(MOCK_PASSWORD);
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="backdrop-blur-sm border-opacity-40 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border border-red-300 bg-red-50">
                <AlertDescription className="text-red-500">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="border border-blue-300 bg-blue-50">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700 text-sm ml-2">
                Use these credentials to login: <strong>{MOCK_EMAIL}</strong> / <strong>{MOCK_PASSWORD}</strong>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                </div>
                <Link
                  to="/reset-password"
                  className="text-xs text-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all duration-300" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <LogIn className="h-4 w-4 mr-2" />
              )}
              Sign In
            </Button>
            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={fillDefaultCredentials}
            >
              Fill Test Account Credentials
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => mockLogin()}
            >
              One-Click Login
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
