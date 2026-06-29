import { Alert, Container } from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import PokemonForm from "./components/PokemonForm";
import PokemonList from "./components/PokemonList";
import TrainerForm from "./components/TrainerForm";
import TrainerList from "./components/TrainerList";

function AppRoutes() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg" className="pokemon-container">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/trainers" element={<TrainerList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/add" element={<Navigate to="/pokemons/add" replace />} />
            <Route
              path="/pokemons/add"
              element={
                <ProtectedRoute>
                  <PokemonForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pokemons/:id/edit"
              element={
                <ProtectedRoute>
                  <PokemonForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainers/add"
              element={
                <ProtectedRoute>
                  <TrainerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainers/:id/edit"
              element={
                <ProtectedRoute>
                  <TrainerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Alert severity="warning">Página no encontrada.</Alert>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
