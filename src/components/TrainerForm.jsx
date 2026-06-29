import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getApiErrorMessage } from "../services/apiClient";
import {
  createTrainer,
  fetchTrainer,
  updateTrainer,
} from "../services/trainerService";
import "./PokemonForm.css";

const initialValues = {
  name: "",
  age: "",
  city: "",
};

export default function TrainerForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) {
      return undefined;
    }

    let active = true;

    fetchTrainer(id)
      .then((trainer) => {
        if (active) {
          setValues({
            name: trainer.name ?? "",
            age: trainer.age ?? "",
            city: trainer.city ?? "",
          });
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudo cargar el entrenador."
            )
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

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

    if (values.age !== "") {
      formData.append("age", values.age);
    }

    if (values.city !== "") {
      formData.append("city", values.city);
    }

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (editing) {
        await updateTrainer(id, formData);
      } else {
        await createTrainer(formData);
      }

      navigate("/trainers");
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          editing
            ? "No se pudo actualizar el entrenador."
            : "No se pudo crear el entrenador."
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
        {editing ? "Editar entrenador" : "Agregar entrenador"}
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
          label="Edad"
          name="age"
          value={values.age}
          onChange={handleChange}
          type="number"
          slotProps={{ htmlInput: { min: 0 } }}
        />
        <TextField
          label="Ciudad"
          name="city"
          value={values.city}
          onChange={handleChange}
        />

        <label className="picture-field">
          Foto {editing && "(opcional: conserva la actual si no eliges otra)"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          />
        </label>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/trainers")}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </section>
  );
}
