import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import AssisSociLogopng from '../../assets/img/AssisSociLogopng.png'



export default function Header() {
  const [mostraMenus, setMostratMenus] = useState<boolean>(false)
  const toggleMenu = () => {
    mostraMenus === false ?
      setMostratMenus(true) :
      setMostratMenus(false)
    console.log(mostraMenus)
  }
  return (
    <>
      <header className="headerclass">
        <div className="logo">
          <img src={AssisSociLogopng} alt="Logo" />
          <div>
            <h1><Link to="/" className="nav-link"> Assistência Social</Link></h1>
            <h5><Link to="/" className="nav-link">Sacolinhas Happy Day 2023</Link></h5>
          </div>
        </div>

        <div id="headerMenu">
          <button id="hamburger-menu" onClick={toggleMenu}>
            <i className="fas fa-bars" />
          </button>
        </div>
      </header>
      <body>
        {mostraMenus ?
          <div onClick={toggleMenu} className='navClass'>
            <nav className="navClassContexto">
              <ul className="nav-list">

                <li className="nav-item">
                  <Link to="/doador" className="nav-link">Doadores</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sacola" className="nav-link">Sacolas</Link>
                </li>
                <li className="nav-item">
                  <Link to="/frente-assistidos" className="nav-link">Frentes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/doacao" className="nav-link">Doações</Link>
                </li>
                <li className="nav-item">
                  <Link to="/celula" className="nav-link">Celula</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Sair</Link>
                </li>
              </ul>
            </nav>
          </div>

          : ""}
      </body>
    </>
  );
}
