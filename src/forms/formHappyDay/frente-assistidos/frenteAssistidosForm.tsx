import React, { useState, useEffect } from 'react';
import './frenteAssistidosForm.css'
import { FrenteAssistidos } from './frenteassistidos';
import { API } from '../../../assets/api/api';
import { Noti } from '../../../components/react-toastify/Noti';
import Notify from '../../../components/react-toastify/react-toastify';
import {
  addItemToStorage,
  readItemFromStorage,
  deleteItemFromStorage,
  clearItemFromStorage
} from '../../../services/storage/storage';
const FrenteAssistidosForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<FrenteAssistidos[]>([]);
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [opcoes, setOpcoes] = useState([
    { value: 0, label: "" },
    { value: 1, label: "1 Sacolinha" },
    { value: 2, label: "2 Sacolinhas" },
    { value: 3, label: "3 Sacolinhas" },
    { value: 4, label: "4 Sacolinhas" },
    { value: 5, label: "5 Sacolinhas" },
  ]);

  const [formData, setFormData] = useState<FrenteAssistidos>({
    id: '',
    codigo: '',
    nome: '',
    sacolinhas: '',
  });
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());

  // Atualiza a data e hora a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    console.log(e)
    // try {
    //   const response = await API.post('/sacolas', formData); // Substitua pela sua rota de API
    //   // loadSacolas();
    //   setFormData({
    //     id: '',
    //     codigo: '',
    //     nome: '',
    //     contato: '',
    //     sacolinhas: '',
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
  return (<>
    <div className='container-header'>Assiste responsavel: {readItemFromStorage("NomeAssistente")} em {dataHoraAtual.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'long',
      timeStyle: 'medium'
    })} </div>
    <div className='container'>
      <h1>Cadastro Frente Assistida</h1>
      <form className='container-form' onSubmit={handleSubmit}>
        <div>
          <label>Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sacolinhas</label>
          <select
            name="sacolinhas"
            value={formData.sacolinhas[0]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFormData({ ...formData, sacolinhas: e.target.value });
            }}
            required
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.value ? opcao.label : ""}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>

    </div>
  </>
  );
};

export default FrenteAssistidosForm;
