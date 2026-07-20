import { Alert, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
//import {pokemons} from "../data/pokemons";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../services/pokemonService";
import "./PokemonList.css";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPokemons().then((data) => {
            setPokemons(Array.isArray(data) ? data : data.results ?? []);
        }).catch((error) => {
            console.error("Error obteniendo pokemons:", error);
            setError("No se pudieron cargar los Pokémon. Comprueba que Django esté encendido.");
        });
    }, []);


    return(
      <section className="pokemon-list-section">
        <Typography variant="h4" component="h1" className="pokemon-list-title">
          Pokémon registrados
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {!error && pokemons.length === 0 && (
          <Alert severity="info">No existen Pokémon registrados.</Alert>
        )}

        <Grid container spacing={3}>
            {pokemons.map(
                (pokemonItem) => (
                    <Grid key= {pokemonItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <PokemonCard pokemon={pokemonItem}/>    
                    </Grid>
                )
            )}
        </Grid>
      </section>
    )
}
