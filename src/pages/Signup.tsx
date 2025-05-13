
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, MOCK_EMAIL, MOCK_PASSWORD } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Key, Mail, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, mockLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Card className="backdrop-blur-sm border-opacity-40 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Create an account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details to create a new account
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
              <div className="flex items-center">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
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
            <div className="space-y-2">
              <div className="flex items-center">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </label>
              </div>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              Create Account
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
              onClick={() => mockLogin()}
            >
              Use Test Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
