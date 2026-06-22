import { AppBar, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";
import "./Header.css";

export default function Header() {
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
      </Container>
    </AppBar>
  );
}
