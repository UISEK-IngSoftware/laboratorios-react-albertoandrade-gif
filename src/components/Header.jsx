import { AppBar, Container, Toolbar, Button } from "@mui/material";
import pokedexLogo from '../assets/pokedex-logo.png';
import './Header.css';
import { isLoggedIn, logout } from "../services/authService";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        setLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="pokedex-navbar">
            <AppBar position="static" elevation={4}>
                <Container maxWidth="lg">

                    {/* Logo */}
                    <Toolbar>
                        <div className="image-container">
                            <img
                                src={pokedexLogo}
                                alt="Logo"
                                className="pokedex-logo"
                            />
                        </div>
                    </Toolbar>


                    {/* Menú */}
                    <Toolbar>

                        <Button color="inherit" component={Link} to="/">
                            Inicio
                        </Button>


                        {loggedIn ? (
                            <>
                                <Button color="inherit" component={Link} to="/add">
                                    Agregar Pokémon
                                </Button>

                                <Button color="inherit" onClick={handleLogout}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Iniciar Sesión
                            </Button>
                        )}

                    </Toolbar>

                </Container>
            </AppBar>
        </div>
    );
}
