import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import "./LoginForms.css";

export default function LoginForms() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        login(username, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error.message);
                setErrorMsg("Nombre de usuario o contraseña incorrectos");
            });
    };

    return (
        <Box
            component="form"
            className="login-form"
            onSubmit={handleLogin}
        >
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión
            </Typography>

            {
                errorMsg && (
                    <Typography color="error">
                        {errorMsg}
                    </Typography>
                )
            }

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
            >
                Iniciar Sesión
            </Button>

        </Box>
    );
}
