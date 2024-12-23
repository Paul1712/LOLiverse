import { create } from "zustand";
import { getData } from "../storage/storageService";
import { persist } from "zustand/middleware";

const useJokesStore = create(
  persist(
    (set) => ({
      favorites: [],
      loadFavorites: async () => {
        const jokesStorage = await getData("jokes-storage");
        if (jokesStorage?.favorites)
          set({ favorites: jokesStorage?.favorites });
      },
      addFavorite: async (joke) => {
        set((state) => {
          const updatedFavorites = [...state.favorites, joke];
          return { favorites: updatedFavorites };
        });
        return { succeded: true };
      },
      removeFavorite: async (id) => {
        set((state) => {
          const updatedFavorites = state.favorites.filter(
            (joke) => joke?.id !== id
          );
          return { favorites: updatedFavorites };
        });
      },
    }),
    {
      name: "jokes-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useJokesStore;
