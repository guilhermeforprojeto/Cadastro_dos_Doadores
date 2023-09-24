import React, { useState, useEffect } from 'react';
import './assistidosForm.css'
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

const AssistidosForm: React.FC = () => {

  return (
    <div className='container'>

      <h1>Cadastro de Assistidos</h1>

    </div>
  );
};

export default AssistidosForm;
