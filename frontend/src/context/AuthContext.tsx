import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  AUTHPROVIDER,
  EMAILIDNOTREGISTERED,
  ERROROCCURED,
  LOGGEDOUTSUCCESS,
  SIGNUPSUCCESS,
  USERNAMEORPASSWORDINCORRECT,
} from "../constants/constant";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(AUTHPROVIDER);
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      toast.success("Login successful!");
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        toast.error(EMAILIDNOTREGISTERED);
      } else if (error.response && error.response.status === 401) {
        toast.error(USERNAMEORPASSWORDINCORRECT);
      } else {
        toast.error(ERROROCCURED);
      }
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      toast.success(SIGNUPSUCCESS);
    } catch (error: any) {
      toast.error(ERROROCCURED);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info(LOGGEDOUTSUCCESS);
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
