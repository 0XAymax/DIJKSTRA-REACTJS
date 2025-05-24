import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import AuthService from "@/api/auth.service";
import { jwtDecode } from "jwt-decode";
import type { RegisterRequest, LoginRequest } from "@/types";
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  login: (userLogin: LoginRequest) => Promise<any>;
  register: (userRegister: RegisterRequest) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  const decodeAndSetToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    const user = decoded as User;
    setCurrentUser(user);

    if (!decoded.exp) {
      console.error("Token does not have an expiration date.");
      removeToken();
      return;
    }

    console.log("Token expires at:", new Date(decoded.exp * 1000));

    if (Date.now() >= decoded.exp * 1000) {
      removeToken();
      console.log("Token expired. User logged out.");
    }
  };

  useEffect(() => {
    console.log("Mounting Token Check");
    const storedToken = localStorage.getItem("token");
    console.log(
      "Checking token on mount:",
      storedToken ? "Token exists" : "No token"
    );

    if (storedToken) {
      AuthService.verifyToken(storedToken)
        .then((res) => {
          if (res.status === 200) {
            decodeAndSetToken(storedToken);
            console.log("Token verified successfully.");
          }else if(res.status === 401){
            removeToken();
            toast.error("Your session has expired. Please log in again.")
            console.log("Token Expired");
          }
          else {
            removeToken();
            console.log("Token verification failed. User logged out.");
          }
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("Token state updated:", token);
    console.log("isAuthenticated updated:", !!token);
  }, [token]);

  const login = async (userLogin: LoginRequest): Promise<any> => {
    const response = await AuthService.login(userLogin);
    const token = response.data.access_token;
    decodeAndSetToken(token);

    return response;
  };

  const register = async (
    userRegister: RegisterRequest
  ): Promise<any> => {
    const res = await AuthService.register(userRegister);
    console.log(res.data);
    return res;
  };

  const logout = () => {
    removeToken();
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};