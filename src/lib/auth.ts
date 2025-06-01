import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          isAuthenticated: true,
          user: {
            name: "Emma Watson",
            email: email,
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          },
        });
      },
      loginWithGoogle: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          isAuthenticated: true,
          user: {
            name: "Emma Watson",
            email: "emma@example.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          },
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
