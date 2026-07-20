import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./PokedexCard.css";

export default function PokemonCard({ pokemon }) {
    const imageUrl = pokemon.image || pokemon.picture || "";
  return (
    <Card className="pokemon-card" elevation={4}>
        <CardMedia
            className="pokemon-image"
            component="img"
            height="300"
            image={imageUrl}
            alt={pokemon.name}
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {pokemon.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Tipo: {pokemon.type}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Altura: {pokemon.height} m
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Peso: {pokemon.weight} kg
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Entrenador: {pokemon.trainer_name || "Sin entrenador"}
            </Typography>

        </CardContent>

    </Card>
  )
}
