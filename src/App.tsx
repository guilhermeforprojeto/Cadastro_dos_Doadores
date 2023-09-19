import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HappyDayForm from './forms/formHappyDay/formHappyDay';
import SacolaForm from './forms/formHappyDay/sacolas/scacolaForm';
import Home from './pages/home/home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sacola" element={<SacolaForm />} />
        <Route path="/happy-day" element={<HappyDayForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
