import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import {
  deletePokemon,
  fetchPokemons,
} from "../services/pokemonService";
import { getApiErrorMessage } from "../services/apiClient";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadPokemons = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchPokemons();
      setPokemons(Array.isArray(data) ? data : data.results ?? []);
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "No se pudo obtener la lista de Pokémon. Verifica que Django esté ejecutándose."
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const handleDelete = async (pokemon) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar a ${pokemon.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePokemon(pokemon.id);
      setPokemons((current) =>
        current.filter((item) => item.id !== pokemon.id)
      );
      setMessage("Pokémon eliminado correctamente.");
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "No se pudo eliminar el Pokémon.")
      );
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 6 }}>
        <CircularProgress aria-label="Cargando Pokémon" />
      </Stack>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Pokémon
      </Typography>

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Puedes consultar los datos sin iniciar sesión. Para crear, editar o
          eliminar debes autenticarte con OAuth2.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {pokemons.length === 0 ? (
        <Alert severity="warning">No existen Pokémon registrados.</Alert>
      ) : (
        <Grid container spacing={3}>
          {pokemons.map((pokemon) => (
            <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PokemonCard
                pokemon={pokemon}
                canManage={isAuthenticated}
                onEdit={(id) => navigate(`/pokemons/${id}/edit`)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
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
