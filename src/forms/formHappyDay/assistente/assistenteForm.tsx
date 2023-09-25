import React, { useState, useEffect } from 'react';
import './assistenteForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';
import {
  addItemToStorage,
  readItemFromStorage,
  deleteItemFromStorage,
  clearItemFromStorage
} from '../../../services/storage/storage';
import { Link, Router } from 'react-router-dom';
import DoadorForm from '../doador/doadorForm';


interface Sacola {
  id: string;
  frenteAssistidaId: string;
  assistidoId: string;
  doadorId: string;
  codigo: string;
  nome: string;
}

const AssistenteForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<Sacola[]>([]);
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });

  const [formData, setFormData] = useState<Sacola>({
    id: '',
    frenteAssistidaId: '',
    assistidoId: '',
    doadorId: '',
    codigo: '',
    nome: '',
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoti({ tipo: "success", msg: "Oi " + formData.nome + ", a Paz  🕊️🙏" })
    console.log(formData)
    clearItemFromStorage()
    const vNomeAssistente: string = formData.nome
    addItemToStorage('NomeAssistente', vNomeAssistente);
    setInterval(() => {
      Paginar()
    }, 2000);
    return () => Paginar()



  };
  const Paginar = () => {
    window.location.href = '/doador';
  }
  return (
    <>
      <Notify notificacao={noti} />
      <div className='contextAssistenteForm'>
        <form className='container-formAssistenteForm' onSubmit={handleSubmit}>
          <h1>Olá Assistente!😁</h1>
          <div>
            <input
              placeholder='Informe seu nome...'
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Avançar</button>
        </form>
      </div>
    </>
  );
};

export default AssistenteForm;
