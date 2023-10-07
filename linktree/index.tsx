import React from "react";
import { FaWhatsapp, FaGoogle, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import QRCode from "qrcode.react";
import "./linktree.css";

export default function Linktree() {
  // Substitua com sua chave Pix
  const chavePix = "35059574000110";

  // Função para copiar a chave Pix para a área de transferência
  const copiarChavePix = () => {
    const input = document.createElement("input");
    input.value = chavePix;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert("Chave Pix copiada para a área de transferência!");
  };

  const dadosPix =
    "00020126360014BR.GOV.BCB.PIX0114350595740001105204000053039865802BR5924GUILHERME SANTANA SANTOS6009SAO.PAULO62070503***630474E7";

  return (
    <div className="linktreebody">
      <div className="linktree">
        <div className="link">
          <FaWhatsapp className="icon" />
          <a
            href="https://api.whatsapp.com/send?phone=551144555650&text=Oi%20Guilherme,%20pode%20me%20ajudar%20com..."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chamar no WhatsApp
          </a>
        </div>
        <div className="link">
          <FaGoogle className="icon" />
          <a
            href="https://g.page/r/CXLDhLnwsWvEEB0/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nos Avalie no Google
          </a>
        </div>
        <div className="link">
          <FaMapMarkerAlt className="icon" />
          <a
            href="https://maps.app.goo.gl/DSJvGoUjif3Hb4j49"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rua Cotoxó 322, Vila Leopodina
          </a>
        </div>
        <div className="link">
          <FaInstagram className="icon" />
          <a
            href="https://www.instagram.com/system_bee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @system_bee
          </a>
        </div>
      </div>
      <div className="titleLinklinktree">
        <div className="titleLinklinktree">
          <h3>Chave Pix</h3>
          <div >
            <h5>Banco: Bradesco</h5>
            <h5>Nome: GUILHERME SANTANA SANTOS 07431916507</h5>
          </div>
          <button onClick={copiarChavePix}>Copiar Chave Pix</button>
          <div className="qrcode-container">
            <div className="qrcode">
              <QRCode value={dadosPix} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
