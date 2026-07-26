import { Alert, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import Spinner from "../components/Spinner";
import "./LoginForms.css";

export default function LoginForms() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        login(username, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error.message);
                setErrorMsg("Nombre de usuario o contraseña incorrectos");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <Spinner message="Iniciando sesión..." />;
    }

    return (
        <Box
            component="form"
            className="login-form"
            onSubmit={handleLogin}
            sx={{ bgcolor: "background.paper" }}
        >
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión
            </Typography>

            {errorMsg && (
                <Alert severity="error" sx={{ width: "100%" }}>
                    {errorMsg}
                </Alert>
            )}

            <TextField
                label="Usuario"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />


            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
            >
                Iniciar Sesión
            </Button>

        </Box>
    );
}
