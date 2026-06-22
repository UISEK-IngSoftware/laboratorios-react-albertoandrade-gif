import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  return (
    <Card className="pokemon-card" elevation={3}>
      <CardMedia
        className="pokemon-image"
        component="img"
        image={pokemon.image}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {pokemon.name}
        </Typography>
        <Chip label={`Tipo: ${pokemon.type}`} variant="outlined" />
      </CardContent>
    </Card>
  );
}
