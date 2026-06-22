import { Box } from "@mui/material";
import { pokemons } from "../data/pokemons";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

export default function PokemonList() {
  return (
    <Box className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Box>
  );
}
