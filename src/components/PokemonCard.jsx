import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import { deletePokemon } from "../services/pokemonService";
import "./PokedexCard.css";

export default function PokemonCard({ pokemon }) {
  const handleDelete = async () => {
    const confirmar = window.confirm(
      `¿Deseas eliminar a ${pokemon.name}?`
    );

    if (!confirmar) return;

    try {
      await deletePokemon(pokemon.id);
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando Pokémon:", error);
      alert("No se pudo eliminar el Pokémon");
    }
  };

  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        className="pokemon-image"
        image={pokemon.image || "https://placehold.co/400x300?text=Pokemon"}
        alt={pokemon.name}
      />

      <CardContent className="pokemon-content">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="h2" className="pokemon-name">
            {pokemon.name}
          </Typography>

          <Chip label={pokemon.type} color="primary" />
        </Stack>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Peso:</strong> {pokemon.weight} kg
        </Typography>

        <Typography variant="body1">
          <strong>Altura:</strong> {pokemon.height} m
        </Typography>

        <Stack direction="row" spacing={1} className="pokemon-buttons">
          <Button variant="contained" color="warning" fullWidth>
            Editar
          </Button>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}