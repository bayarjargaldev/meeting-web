import { create } from "zustand";
import { User } from "../types";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

const getInitialUser = (): User | null => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("jwt_token"),
  user: getInitialUser(),
  isAuthenticated: !!localStorage.getItem("jwt_token"),

  setAuth: (token, user) => {
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
