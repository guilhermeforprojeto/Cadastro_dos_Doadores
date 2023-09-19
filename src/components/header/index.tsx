import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Sacolinhas Happy Day 2023</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/sacola" className="nav-link">Sacola</Link>
          </li>
          <li className="nav-item">
            <Link to="/happy-day" className="nav-link">Happy Day</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
