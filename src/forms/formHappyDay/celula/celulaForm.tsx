import React, { useState, useEffect } from 'react';
import './celulaForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';

interface Sacola {
  id: string;
  frenteAssistidaId: string;
  assistidoId: string;
  doadorId: string;
  codigo: string;
  conteudo: string;
}

const CelulaForm: React.FC = () => {

  return (
    <div className='containerCelula'>

      {/* LISTA 
      LISTA 
      LISTA  */}
      <h2>Celula</h2>
    </div>
  );
};

export default CelulaForm;