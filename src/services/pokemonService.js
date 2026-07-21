import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchPokemons = async () => {
  try {
    const response = await apiClient.get("/pokemons/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPokemon = async (pokemonData) => {
  const formData = new FormData();

  formData.append("name", pokemonData.name);
  formData.append("type", pokemonData.type);
  formData.append("weight", pokemonData.weight);
  formData.append("height", pokemonData.height);

  if (pokemonData.image) {
    formData.append("image", pokemonData.image);
  }

  try {
    const response = await apiClient.post("/pokemons/", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePokemon = async (id, pokemonData) => {
  const formData = new FormData();

  formData.append("name", pokemonData.name);
  formData.append("type", pokemonData.type);
  formData.append("weight", pokemonData.weight);
  formData.append("height", pokemonData.height);

  if (pokemonData.image) {
    formData.append("image", pokemonData.image);
  }

  try {
    const response = await apiClient.put(`/pokemons/${id}/`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePokemon = async (id) => {
  try {
    const response = await apiClient.delete(`/pokemons/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};