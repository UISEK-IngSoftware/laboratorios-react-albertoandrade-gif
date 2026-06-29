import apiClient from "./apiClient";

export async function fetchTrainers() {
  const response = await apiClient.get("/entrenadores/");
  return response.data;
}

export async function fetchTrainer(id) {
  const response = await apiClient.get(`/entrenadores/${id}/`);
  return response.data;
}

export async function createTrainer(formData) {
  const response = await apiClient.post("/entrenadores/", formData);
  return response.data;
}

export async function updateTrainer(id, formData) {
  const response = await apiClient.put(`/entrenadores/${id}/`, formData);
  return response.data;
}

export async function deleteTrainer(id) {
  await apiClient.delete(`/entrenadores/${id}/`);
}
