import axios from "axios";

const API_BASE_URL = "https://api.chucknorris.io/jokes";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchJokeByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/random?category=${category}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching joke by category:", error);
    throw error;
  }
};

export const searchJokes = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
    return response?.data?.result;
  } catch (error) {
    console.log("Error fetching search jokes:", error);
    throw error;
  }
};

export const fetchRandomJoke = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random`);
    return response?.data?.value;
  } catch (error) {
    console.error("Error fetching random joke:", error);
    throw error;
  }
};
