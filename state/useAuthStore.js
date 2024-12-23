import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      registeredUsers: [],
      register: (email, password, name) => {
        const existingUser = get().registeredUsers.find(
          (user) => user.email === email
        );
        if (existingUser) {
          throw new Error("Email is already registered");
        }
        set((state) => ({
          registeredUsers: [
            ...state.registeredUsers,
            { email, password, name },
          ],
        }));
      },
      login: (email, password) => {
        const user = get().registeredUsers.find(
          (user) => user.email === email && user.password === password
        );
        if (!user) {
          throw new Error("Invalid credentials");
        }
        set({ user, token: "mockToken", isLoggedIn: true });
      },
      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useAuthStore;
