import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './components/Header';
import LoginForms from './pages/LoginForms';
import PokemonList from './pages/PokemonList';
import PokemonForm from './components/PokemonForm';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container className="main-container">
        <Routes>
          <Route path="/login" element={<LoginForms />} />
          <Route path="/" element={<PokemonList />} />
          <Route path="/add" element={<PokemonForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
