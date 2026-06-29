import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import pokedexLogo from "../assets/pokedex-logo.png";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <AppBar position="static" className="pokedex-navbar">
      <Container maxWidth="lg">
        <Toolbar className="header-toolbar">
          <img
            className="pokedex-logo"
            src={pokedexLogo}
            alt="Logo de Pokédex"
          />
        </Toolbar>

        <Toolbar className="navigation-toolbar">
          <Button color="inherit" component={Link} to="/">
            Pokémon
          </Button>
          <Button color="inherit" component={Link} to="/trainers">
            Entrenadores
          </Button>

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/pokemons/add">
                Agregar Pokémon
              </Button>
              <Button color="inherit" component={Link} to="/trainers/add">
                Agregar Entrenador
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Iniciar sesión
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
