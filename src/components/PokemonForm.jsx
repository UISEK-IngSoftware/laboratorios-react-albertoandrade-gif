import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getApiErrorMessage } from "../services/apiClient";
import {
  createPokemon,
  fetchPokemon,
  updatePokemon,
} from "../services/pokemonService";
import { fetchTrainers } from "../services/trainerService";
import "./PokemonForm.css";

const initialValues = {
  name: "",
  type: "",
  weight: "",
  height: "",
  trainer: "",
};

export default function PokemonForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const trainerData = await fetchTrainers();
        if (active) {
          setTrainers(
            Array.isArray(trainerData)
              ? trainerData
              : trainerData.results ?? []
          );
        }

        if (editing) {
          const pokemon = await fetchPokemon(id);
          if (active) {
            setValues({
              name: pokemon.name ?? "",
              type: pokemon.type ?? "",
              weight: pokemon.weight ?? "",
              height: pokemon.height ?? "",
              trainer: pokemon.trainer ?? "",
            });
          }
        }
      } catch (requestError) {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudieron cargar los datos del formulario."
            )
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [editing, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("weight", values.weight);
    formData.append("height", values.height);

    if (values.trainer !== "") {
      formData.append("trainer", values.trainer);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editing) {
        await updatePokemon(id, formData);
      } else {
        await createPokemon(formData);
      }

      navigate("/");
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          editing
            ? "No se pudo actualizar el Pokémon."
            : "No se pudo crear el Pokémon."
        )
      );
    } finally {
      setSaving(false);
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
    <section className="pokemon-form-section">
      <Typography variant="h4" component="h1" gutterBottom>
        {editing ? "Editar Pokémon" : "Agregar Pokémon"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" className="pokemon-form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Tipo"
          name="type"
          value={values.type}
          onChange={handleChange}
          required
        />
        <TextField
          label="Peso"
          name="weight"
          value={values.weight}
          onChange={handleChange}
          type="number"
          slotProps={{ htmlInput: { min: 0, step: "any" } }}
          required
        />
        <TextField
          label="Altura"
          name="height"
          value={values.height}
          onChange={handleChange}
          type="number"
          slotProps={{ htmlInput: { min: 0, step: "any" } }}
          required
        />
        <TextField
          select
          label="Entrenador"
          name="trainer"
          value={values.trainer}
          onChange={handleChange}
        >
          <MenuItem value="">Sin entrenador</MenuItem>
          {trainers.map((trainer) => (
            <MenuItem key={trainer.id} value={trainer.id}>
              {trainer.name}
            </MenuItem>
          ))}
        </TextField>

        <label className="picture-field">
          Imagen {editing && "(opcional: conserva la actual si no eliges otra)"}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          />
        </label>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </section>
  );
}
