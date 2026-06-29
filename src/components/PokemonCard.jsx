import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import "./PokemonCard.css";

function resolvePokemonImage(pokemon) {
  const source = pokemon.image || pokemon.picture;

  if (!source) {
    return "";
  }

  if (/^https?:\/\//i.test(source)) {
    return source;
  }

  const mediaUrl = (
    import.meta.env.VITE_MEDIA_URL || "http://localhost:8000/media"
  ).replace(/\/$/, "");

  if (source.startsWith("/media/")) {
    return `${new URL(mediaUrl).origin}${source}`;
  }

  return `${mediaUrl}/${source.replace(/^\//, "")}`;
}

export default function PokemonCard({ pokemon, canManage, onEdit, onDelete }) {
  const imageUrl = resolvePokemonImage(pokemon);

  return (
    <Card className="pokemon-card" elevation={3}>
      {imageUrl && (
        <CardMedia
          className="pokemon-image"
          component="img"
          image={imageUrl}
          alt={pokemon.name}
        />
      )}

      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {pokemon.name}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label={`Tipo: ${pokemon.type}`} variant="outlined" />
          <Chip label={`Altura: ${pokemon.height}`} variant="outlined" />
          <Chip label={`Peso: ${pokemon.weight}`} variant="outlined" />
        </Stack>

        <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
          Entrenador: {pokemon.trainer_name || "Sin entrenador"}
        </Typography>
      </CardContent>

      {canManage && (
        <CardActions>
          <Button size="small" onClick={() => onEdit(pokemon.id)}>
            Editar
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(pokemon)}>
            Eliminar
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
