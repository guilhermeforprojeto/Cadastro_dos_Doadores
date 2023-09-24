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

  // const loadSacolas = async () => {
  //   try {
  //     const response = await API.get('/assistidos'); // Substitua pela sua rota de API
  //     setSacolas(response.data.sacolas);
  //     setNoti({ tipo: "info", msg: response.data.message })
  //     // console.log(response)
  //   } catch (error) {
  //     console.error('Erro ao carregar sacolas:', error);
  //   }
  // };

  // useEffect(() => {
  //   loadSacolas();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    clearItemFromStorage()
    const vNomeAssistente: string = formData.nome
    addItemToStorage('NomeAssistente', vNomeAssistente);

    window.location.href = '/doador';


    // try {
    //   const response = await API.post('/assistidos', formData); // Substitua pela sua rota de API
    //   loadSacolas();
    //   setFormData({
    //     id: '',
    //     frenteAssistidaId: '',
    //     assistidoId: '',
    //     doadorId: '',
    //     codigo: '',
    //     nome: '',
    //   });
    //   setNoti({ tipo: "success", msg: response.data.message })

    //   if (response.status === 201) {
    //     setNoti({ tipo: "success", msg: response.data.message })
    //     console.log('Sacola criada com sucesso!', response.data.message);
    //   } else {
    //     console.error('Erro ao criar sacola:', response.data.message);
    //   }
    // }
    // catch (error) {
    //   setNoti({ tipo: "error", msg: "Erro ao criar sacola" })
    //   console.error('Erro ao criar sacola:', error);
    // }
  };

  return (
    <>
      <Notify notificacao={noti} />
      <div className='context'>
        <form className='container-form' onSubmit={handleSubmit}>
          <h1>Cadastro do Assistente</h1>
          <div>
            <label>Qual seu nome?</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <button onClick={() => { setNoti({ tipo: "success", msg: "Assistente " + formData.nome + " cadastrado com sucesso!" }) }} type="submit">Cadastar Assisnte</button>
        </form>
      </div>
    </>
  );
};

export default AssistenteForm;
