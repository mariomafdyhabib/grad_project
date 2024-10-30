"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  name: string;
  role: string;
  email: string;
  jobTitle?: string;
  description?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:7000/api/users/me",
            {
              headers: { "x-auth-token": token },
            },
          );

          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
