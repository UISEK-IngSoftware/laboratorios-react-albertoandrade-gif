import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { getApiErrorMessage } from "../services/apiClient";
import {
  deleteTrainer,
  fetchTrainers,
} from "../services/trainerService";

export default function TrainerList() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadTrainers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchTrainers();
      setTrainers(Array.isArray(data) ? data : data.results ?? []);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "No se pudo obtener la lista de entrenadores."
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrainers();
  }, [loadTrainers]);

  const handleDelete = async (trainer) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a ${trainer.name}?`)) {
      return;
    }

    try {
      await deleteTrainer(trainer.id);
      setTrainers((current) =>
        current.filter((item) => item.id !== trainer.id)
      );
      setMessage("Entrenador eliminado correctamente.");
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "No se pudo eliminar el entrenador.")
      );
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 6 }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Entrenadores
      </Typography>

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Inicia sesión para agregar, editar o eliminar entrenadores.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {trainers.length === 0 ? (
        <Alert severity="warning">No existen entrenadores registrados.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Pokémon asignados</TableCell>
                {isAuthenticated && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {trainers.map((trainer) => (
                <TableRow key={trainer.id}>
                  <TableCell>{trainer.name}</TableCell>
                  <TableCell>{trainer.age ?? "—"}</TableCell>
                  <TableCell>{trainer.city || "—"}</TableCell>
                  <TableCell>{trainer.pokemons?.length ?? 0}</TableCell>
                  {isAuthenticated && (
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => navigate(`/trainers/${trainer.id}/edit`)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(trainer)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        message={message}
        onClose={() => setMessage("")}
      />
    </>
  );
}
