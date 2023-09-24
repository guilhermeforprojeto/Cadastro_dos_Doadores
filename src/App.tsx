import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HappyDayForm from './forms/formHappyDay/formHappyDay';
import SacolaForm from './forms/formHappyDay/sacolas/scacolaForm';
import Home from './pages/home/home';
import AssistenteForm from './forms/formHappyDay/assistente/assistenteForm';
import DoadorForm from './forms/formHappyDay/doador/doadorForm';
import CelulaForm from './forms/formHappyDay/celula/celulaForm';
import AssistidosForm from './forms/formHappyDay/assistidos-naousar/assistidosForm';
import FrenteAssistidosForm from './forms/formHappyDay/frente-assistidos/frenteAssistidosForm';
import NotFound from './pages/notfound/notfound';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sacola" element={<SacolaForm />} />
        <Route path="/happydayform" element={<HappyDayForm />} />
        <Route path="/assistente" element={<AssistenteForm />} />
        <Route path="/assistidos" element={<AssistidosForm />} />
        <Route path="/celula" element={<CelulaForm />} />
        <Route path="/doador" element={<DoadorForm />} />
        <Route path="/frente-assistidos" element={<FrenteAssistidosForm />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
