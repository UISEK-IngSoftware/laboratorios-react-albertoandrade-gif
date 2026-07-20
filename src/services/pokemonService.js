import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export const fetchPokemons = async () => {
    try {
        const response = await apiClient.get('/pokemons/');
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de Pokémon:", error);
        throw error;
    }
};

export const addPokemon = async (pokemonData) => {
  const payload = new FormData();
  payload.append('name', pokemonData.name);
  payload.append('type', pokemonData.type);
  payload.append('weight', pokemonData.weight);
  payload.append('height', pokemonData.height);

  if (pokemonData.image) {
    payload.append('image', pokemonData.image);
  }

  try {
    const response = await apiClient.post('/pokemons/', payload);
    return response.data;
  } catch (error) {
    console.error("Error al agregar Pokémon:", error);
    throw error;
  }
};
