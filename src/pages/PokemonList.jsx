import { Alert, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import {
    fetchPokemons,
    deletePokemon
} from "../services/pokemonService";
import "./PokemonList.css";

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState("");

    const loadPokemons = () => {
        fetchPokemons()
            .then((data) => {
                setPokemons(Array.isArray(data) ? data : data.results ?? []);
            })
            .catch((error) => {
                console.error("Error obteniendo pokemons:", error);
                setError("No se pudieron cargar los Pokémon. Comprueba que Django esté encendido.");
            });
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    const handleDelete = async (id) => {
        const confirmar = window.confirm("¿Deseas eliminar este Pokémon?");
        if (!confirmar) return;

        try {
            await deletePokemon(id);
            loadPokemons();
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el Pokémon.");
        }
    };

    const handleEdit = (pokemon) => {
        // Aquí luego puedes abrir un formulario de edición
        console.log("Editar:", pokemon);
    };

    return (
        <section className="pokemon-list-section">
            <Typography variant="h4" component="h1" className="pokemon-list-title">
                Pokémon registrados
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {!error && pokemons.length === 0 && (
                <Alert severity="info">
                    No existen Pokémon registrados.
                </Alert>
            )}

            <Grid container spacing={3}>
                {pokemons.map((pokemonItem) => (
                    <Grid
                        key={pokemonItem.id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <PokemonCard
                            pokemon={pokemonItem}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </Grid>
                ))}
            </Grid>
        </section>
    );
}