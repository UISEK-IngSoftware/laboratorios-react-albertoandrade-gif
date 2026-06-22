import { Container } from "@mui/material";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg" className="pokemon-container">
          <PokemonList />
        </Container>
      </main>
    </>
  );
}

export default App;
