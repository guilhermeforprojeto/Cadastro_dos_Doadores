import React, { useState } from 'react';
import './HappyDay.css';

const HappyDayForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeAssistenteSocial: '',
    frenteAssistida: '',
    codigoSacolinha: '',
    nomeAssistido: '',
    nomeDoador: '',
    telefone: '',
    celulaQueFrequenta: '',
    observacoes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o servidor ou realizar outras ações
    console.log(formData);
    alert("Obrigado: " + formData.nomeAssistenteSocial + ". Os dados foram salvos");
  };

  const handleReset = () => {
    setFormData({
      nomeAssistenteSocial: '',
      frenteAssistida: '',
      codigoSacolinha: '',
      nomeAssistido: '',
      nomeDoador: '',
      telefone: '',
      celulaQueFrequenta: '',
      observacoes: '',
    });
  };

  return (
    <div className="container">
      <h1>Sacolinhas Happy Day 2023</h1>
      <h4>Bola de Neve Church</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeAssistenteSocial">NOME DO ASSISTENTE SOCIAL</label>
        <input
          type="text"
          id="nomeAssistenteSocial"
          name="nomeAssistenteSocial"
          value={formData.nomeAssistenteSocial}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="frenteAssistida">FRENTE ASSISTIDA</label>
        <select
          id="frenteAssistida"
          name="frenteAssistida"
          value={formData.frenteAssistida}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="asil1">Asilo 1</option>
          <option value="asil2">Asilo 2</option>
          <option value="asil3">Asilo 3</option>
          <option value="asil4">Asilo 4</option>
        </select>

        <label htmlFor="codigoSacolinha">CÓDIGO DA SACOLINHA</label>
        <input
          type="text"
          id="codigoSacolinha"
          name="codigoSacolinha"
          value={formData.codigoSacolinha}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="nomeAssistido">NOME DO ASSISTIDO</label>
        <input
          type="text"
          id="nomeAssistido"
          name="nomeAssistido"
          value={formData.nomeAssistido}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="nomeDoador">NOME DO DOADOR</label>
        <input
          type="text"
          id="nomeDoador"
          name="nomeDoador"
          value={formData.nomeDoador}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="telefone">TELEFONE (WHATSAPP)</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="celulaQueFrequenta">CÉLULA QUE FREQUENTA</label>
        <input
          type="text"
          id="celulaQueFrequenta"
          name="celulaQueFrequenta"
          value={formData.celulaQueFrequenta}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="observacoes">OBSERVAÇÕES</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleInputChange}
          rows={4}
        ></textarea>

        <button type="submit">Enviar</button>
        <button type="button" onClick={handleReset}>Limpar Formulário</button>
      </form>
    </div>
  );
};

export default HappyDayForm;
