
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-500 text-white p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="text-xl font-bold">StudentDash</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Dashboard
          </Link>
          {currentUser && (
            <Link to="/add-student" className="text-sm font-medium hover:text-blue-500 transition-colors">
              Add Student
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">
                {currentUser.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
