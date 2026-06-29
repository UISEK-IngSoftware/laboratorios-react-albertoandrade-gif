import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  saveTokens,
} from "./tokenStorage";

const AUTH_BASE_URL = (
  import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:8000/o"
).replace(/\/$/, "");

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

function requireOAuthConfiguration() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Faltan VITE_CLIENT_ID o VITE_CLIENT_SECRET en el archivo .env."
    );
  }
}

export async function login(username, password) {
  requireOAuthConfiguration();

  const form = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: "read write",
  });

  const response = await axios.post(`${AUTH_BASE_URL}/token/`, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  saveTokens(response.data);
  return response.data;
}

export async function logout() {
  const token = getAccessToken();

  try {
    if (token && CLIENT_ID && CLIENT_SECRET) {
      const form = new URLSearchParams({
        token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      });

      await axios.post(`${AUTH_BASE_URL}/revoke_token/`, form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    }
  } catch (error) {
    console.warn("No se pudo revocar el token en el servidor:", error);
  } finally {
    clearTokens();
  }
}
