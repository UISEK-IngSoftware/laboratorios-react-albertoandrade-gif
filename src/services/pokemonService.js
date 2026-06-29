import apiClient from "./apiClient";

export async function fetchPokemons() {
  const response = await apiClient.get("/pokemons/");
  return response.data;
}

export async function fetchPokemon(id) {
  const response = await apiClient.get(`/pokemons/${id}/`);
  return response.data;
}

export async function createPokemon(formData) {
  const response = await apiClient.post("/pokemons/", formData);
  return response.data;
}

export async function updatePokemon(id, formData) {
  const response = await apiClient.put(`/pokemons/${id}/`, formData);
  return response.data;
}

export async function deletePokemon(id) {
  await apiClient.delete(`/pokemons/${id}/`);
}
