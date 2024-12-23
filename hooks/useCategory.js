import { useState } from "react";
import { fetchJokeByCategory } from "../services/apiService";
import useJokesStore from "../state/useJokeStore";

const useCategory = (category) => {
  const [joke, setJoke] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addFavorite = useJokesStore((state) => state.addFavorite);

  const loadJoke = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchJokeByCategory(category);
      setJoke(data);
    } catch (err) {
      setError("Failed to load joke. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorite = async () => {
    if (!joke) return;
    try {
      const status = await addFavorite(joke);
      setIsFavorite(status?.succeded ?? false);
    } catch {
      setIsFavorite(false);
      setError("Failed to save favorite. Please try again.");
    }
  };

  const reset = () => {
    setJoke(null);
    setIsLoading(true);
    setIsFavorite(false);
    setError(null);
  };

  return {
    joke,
    isLoading,
    isFavorite,
    error,
    loadJoke,
    saveFavorite,
    reset,
  };
};

export default useCategory;
