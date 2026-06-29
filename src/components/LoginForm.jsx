import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { getApiErrorMessage } from "../services/apiClient";

export default function LoginForm() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const destination = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(username, password);
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          requestError.message ||
            "No se pudo iniciar sesión. Revisa usuario, contraseña y credenciales OAuth2."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <Alert severity="success">
        Ya existe una sesión activa. Puedes administrar Pokémon y entrenadores.
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ maxWidth: 520, mx: "auto", p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Iniciar sesión
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        El inicio de sesión obtiene un token OAuth2 desde Django. Las consultas
        GET son públicas; POST, PUT y DELETE requieren el token.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Usuario de Django"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
          autoComplete="username"
          required
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
          autoComplete="current-password"
          required
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
    </Paper>
  );
}
