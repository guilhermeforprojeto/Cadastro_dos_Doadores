import React, { useState } from 'react';
import './BibleVerseWidget.css'
function BibleVerseWidget() {
  const [verse, setVerse] = useState('');

  async function fetchRandomVerse() {
    try {
      const response = await fetch("https://www.abibliadigital.com.br/api/verses/nvi/random");
      const data = await response.json();

      if (data && data.text) {
        setVerse(`${data.text} - ${data.book.name} ${data.chapter}:${data.number}`);
      } else {
        setVerse("Não foi possível obter um versículo.");
      }
    } catch (error) {
      console.error(error);
      setVerse("Ocorreu um erro ao obter o versículo.");
    }
  }

  return (
    <div id="bible-widget">
      <div><h2>Paz do senhor Jesus Cristo!</h2></div>
      <div>
        <button id="mostrarVersiculo" onClick={fetchRandomVerse}>Trazer um versículo</button>
      </div>
      <div>
        <span id="versiculo">{verse}</span>
      </div>
    </div>
  );
}

export default BibleVerseWidget;
