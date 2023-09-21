import React, { useState, useEffect } from 'react';
import './doadorForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';
import {
  addItemToStorage,
  readItemFromStorage,
  deleteItemFromStorage,
  clearItemFromStorage
} from '../../../services/storage/storage';
import { Doador } from './doador';


const DoadorForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<Doador[]>([]);
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHandleFormData({ ...handleformData, [e.target.name]: e.target.value });
  };
  // const [opcoes, setOpcoes] = useState([
  //   { value: 0, label: "" },
  //   { value: 1, label: "1 Sacolinha" },
  //   { value: 2, label: "2 Sacolinhas" },
  //   { value: 3, label: "3 Sacolinhas" },
  //   { value: 4, label: "4 Sacolinhas" },
  //   { value: 5, label: "5 Sacolinhas" },
  // ]);
  const [handleformData, setHandleFormData] = useState<any>({
    id: '',
    nome: '',
    contato: '',
    sacolinhasSelecionadas: [],
    sacolinhaAtual: '',
  });
  const [formData, setFormData] = useState<Doador>({

    nome: handleformData.nome,
    contato: handleformData.contato,
    sacolinhas: handleformData.sacolinhasSelecionadas,

  });

  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());

  // Atualiza a data e hora a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const SaveForm = () => {
    setNoti({ tipo: 'success', msg: 'Sacolainha cadastrada!' })
    console.log(formData)

  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      nome: handleformData.nome,
      contato: handleformData.contato,
      sacolinhas: handleformData.sacolinhasSelecionadas,
    })
    // console.log(handleformData)
    // console.log(e)
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

  useEffect(() => {
    loadSacolas();
  }, []);

  const loadSacolas = async () => {
    try {
      const response = await API.get('/sacolas'); // Substitua pela sua rota de API
      setSacolasOP(response.data.sacolas);
      console.log(sacolasOP)
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      console.error('Erro ao carregar sacolas:', error);
    }
  };
  interface OpcaoSacolinha {
    codigo: string;
  }
  const [sacolasOP, setSacolasOP] = useState<OpcaoSacolinha[]>([])


  const handleAdicionarSacolinha = () => {
    if (handleformData.sacolinhaAtual && !handleformData.sacolinhasSelecionadas.includes(handleformData.sacolinhaAtual)) {
      setHandleFormData({
        id: '',
        nome: '',
        contato: '',
        sacolinhasSelecionadas: [],
        sacolinhaAtual: '',
      })
      setHandleFormData({
        ...handleformData,
        sacolinhasSelecionadas: [...handleformData.sacolinhasSelecionadas, handleformData.sacolinhaAtual],
        sacolinhaAtual: '',
      });
    } else {
      console.error("Sacolainha já cadastrada!")
      setNoti({ tipo: 'error', msg: 'Sacolainha já cadastrada!' })
    }
  };

  const handleRemoverSacolinha = (sacolinha: string) => {
    const novaListaSacolinhas = handleformData.sacolinhasSelecionadas.filter(
      (item: string) => item !== sacolinha
    );

    setHandleFormData({
      ...handleformData,
      sacolinhasSelecionadas: novaListaSacolinhas,
    });
  };
  return (<>
    <Notify notificacao={noti} />
    <div className='container-header'>Assiste responsavel: {readItemFromStorage("NomeAssistente")} em {dataHoraAtual.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'long',
      timeStyle: 'medium'
    })} </div>
    <div className='container'>
      <h1>Cadastro de Doador</h1>
      <form className='container-form' onSubmit={handleSubmit}>

        <div>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={handleformData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contato</label>
          <input
            type="text"
            name="contato"
            value={handleformData.contato}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>
            <label>Sacolinhas Disponíveis:</label>
            <select
              name="sacolinhasDisponiveis"
              value={handleformData.sacolinhaAtual}
              onChange={(e) => {
                setHandleFormData({ ...handleformData, sacolinhaAtual: e.target.value });
              }}
            >
              <option value="">Selecione uma sacolinha</option>
              {sacolasOP.map((opcao: OpcaoSacolinha) => (
                <option key={opcao.codigo} value={opcao.codigo}>
                  {opcao.codigo}
                </option>
              ))}
            </select>
            <button onClick={handleAdicionarSacolinha}>Adicionar Sacolinha</button>
          </div>

          <div>
            <label>Sacolinhas Selecionadas:</label>
            <ul>
              {handleformData.sacolinhasSelecionadas.map((sacolinha: any | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => (
                <li key={sacolinha}>
                  {sacolinha}
                  <button onClick={() => handleRemoverSacolinha(sacolinha)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={SaveForm}>Salvar</button>
      </form>
    </div>
  </>
  );
};

export default DoadorForm;
