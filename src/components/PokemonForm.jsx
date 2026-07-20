import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import "./PokemonForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPokemon } from "../services/pokemonService";


export default function PokemonForm() {

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        image: null,
    });


    const handleInputChange = (e) => {

        const { name, value } = e.target;

        if (name === "image") {

            setPokemonData((prevData) => ({
                ...prevData,
                image: e.target.files[0],
            }));

        } else {

            setPokemonData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addPokemon(pokemonData);

            alert("Pokémon agregado exitosamente");

            navigate("/");

        } catch (error) {

            console.error("Error al agregar Pokémon:", error);

            setErrorMsg(
                "Ocurrió un error al agregar el Pokémon. Por favor, inténtalo de nuevo."
            );

        }
    };


    return (
        <>

            <Typography variant="h4" gutterBottom>
                Formulario de Pokémon
            </Typography>


            <Box
                component="form"
                className="pokemon-form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >


                <TextField
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    value={pokemonData.name}
                    onChange={handleInputChange}
                    required
                />


                <TextField
                    name="type"
                    label="Tipo"
                    variant="outlined"
                    value={pokemonData.type}
                    onChange={handleInputChange}
                    required
                />


                <TextField
                    name="weight"
                    label="Peso"
                    variant="outlined"
                    value={pokemonData.weight}
                    onChange={handleInputChange}
                    type="number"
                    required
                />


                <TextField
                    name="height"
                    label="Altura"
                    variant="outlined"
                    value={pokemonData.height}
                    onChange={handleInputChange}
                    type="number"
                    required
                />


                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                />


                {
                    errorMsg && (
                        <Alert severity="error">
                            {errorMsg}
                        </Alert>
                    )
                }


                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Guardar
                </Button>


            </Box>

        </>
    );
}
