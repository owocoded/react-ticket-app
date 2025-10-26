// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string, stayLoggedIn: boolean) => { success: boolean; message?: string };
  signup: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  isAuthenticated: boolean;
}

interface SessionData {
  token: string;
  user: string;
  createdAt?: number;
  stayLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const sessionStr = localStorage.getItem("ticketapp_session");
    if (sessionStr) {
      const session: SessionData = JSON.parse(sessionStr);
      if (
        session.stayLoggedIn ||
        (session.createdAt && Date.now() - session.createdAt < 30 * 60 * 1000)
      ) {
        setUser(session.user);
      } else {
        localStorage.removeItem("ticketapp_session");
      }
    }
  }, []);

  const login = (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ): { success: boolean; message?: string } => {
    // Check if user exists in stored users
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const session: SessionData = {
        token: "demo_token_123",
        user: email,
        stayLoggedIn,
        createdAt: stayLoggedIn ? undefined : Date.now(),
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(session));
      setUser(email);
      addToast("Login successful!", "success");

      // Redirect user to last intended route if available
      const redirectPath = localStorage.getItem("redirectPath");
      if (redirectPath) {
        localStorage.removeItem("redirectPath");
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

      return { success: true };
    } else {
      const message = "Invalid credentials. Please try again.";
      addToast(message, "error");
      return { success: false, message };
    }
  };

  const signup = (email: string, password: string): { success: boolean; message?: string } => {
    // Simulate signup (you can extend this)
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const existing = users.find((u: any) => u.email === email);
    if (existing) {
      const message = "User already exists. Please log in.";
      addToast(message, "error");
      return { success: false, message };
    }
    users.push({ email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    addToast("Signup successful! Please log in.", "success");
    navigate("/auth/login");
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setUser(null);
    addToast("You have been logged out.", "info");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
