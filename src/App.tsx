import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HappyDayForm from './forms/formHappyDay/formHappyDay';
import SacolaForm from './forms/formHappyDay/sacolas/scacolaForm';
import Home from './pages/home/home';
import AssistenteForm from './forms/formHappyDay/assistente/assistenteForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistente" element={<AssistenteForm />} />
        <Route path="/assistidos" element={<SacolaForm />} />
        <Route path="/celula" element={<HappyDayForm />} />
        <Route path="/doador" element={<HappyDayForm />} />
        <Route path="/frente-assistidos" element={<HappyDayForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
