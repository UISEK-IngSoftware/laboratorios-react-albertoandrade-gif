import { Box, CircularProgress, Typography } from "@mui/material";
import "./Spinner.css";

export default function Spinner({ message = "Cargando..." }) {
    return (
        <Box
            className="spinner-container"
            role="status"
            aria-live="polite"
        >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
}
