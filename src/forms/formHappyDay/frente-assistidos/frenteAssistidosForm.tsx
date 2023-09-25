import React, { useState, useEffect } from 'react';
import './frenteAssistidosForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';
import {
  addItemToStorage,
  readItemFromStorage,
  deleteItemFromStorage,
  clearItemFromStorage
} from '../../../services/storage/storage';
import { Doador } from '../doador/doador';
import { tFrenteAssistidos } from './frenteassistidos';


const FrenteAssistidosForm: React.FC = () => {
  const [frentesList, setFrentesList] = useState<tFrenteAssistidos[]>([]);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHandleFormData({ ...handleformData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (id: string) => {
    setEditingItemId(id);
    // Preencha os campos de edição com os dados atuais da sacola
    const sacolaAtual = frentesList.find((sacola) => sacola.id === id);
    if (sacolaAtual) {
      setFormData({ ...formData, ...sacolaAtual });
    }
  };
  const handleSaveEdit = async (id: string) => {
    try {
      const response = await API.put('/frente-assistida/' + id, formData); // Substitua pela sua rota de API
      loadSacolas();
      setFrentesList([
        {
          id: '',
          nome: '',
          assistidos: ['']
        }
      ])
      setFormData({
        id: '',
        nome: '',
        assistidos: ['']
      });
      setNoti({ tipo: "success", msg: response.data.message })
      // if (response.status === 201) {
      //   setNoti({ tipo: "success", msg: response.data.message })
      //   console.log('Sacola criada com sucesso!', response.data.message);
      // } else {
      //   console.error('Erro ao criar sacola:', response.data.message);
      // }
    }
    catch (error) {
      setNoti({ tipo: "error", msg: "Erro ao criar sacola" })
      console.error('Erro ao criar sacola:', error);
    }
    // Implemente a lógica para salvar as alterações na sacola com o ID especificado
    // Normalmente, você faria uma chamada à API para atualizar os dados no servidor
    // Aqui, você pode apenas cancelar o modo de edição
    setEditingItemId(null);
  };

  const handleDelete = async (FRENTE: tFrenteAssistidos) => {
    try {
      await API.delete(`/frente-assistida/${FRENTE.id}`); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: "FRENTE " + FRENTE.nome + " deletada com suceso" })
      loadSacolas();
    } catch (error) {
      setNoti({ tipo: "error", msg: "Não foi possivel apagar " })
      console.error('Erro ao excluir FRENTE:', error);
    }
  };
  const [handleformData, setHandleFormData] = useState<any>({
    id: '',
    nome: '',
    contato: '',
    sacolinhasSelecionadas: [],
    sacolinhaAtual: '',
  });
  const [formData, setFormData] = useState<tFrenteAssistidos>({

    id: handleformData.nome,
    nome: handleformData.nome,
    assistidos: handleformData.contato,

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
      id: handleformData.nome,
      nome: handleformData.nome,
      assistidos: handleformData.contato,
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
      const response = await API.get('/frente-assistida'); // Substitua pela sua rota de API
      // setSacolasOP(response.data);
      setFrentesList(response.data.frenteAssistida)
      console.log(response.data)
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
      <h1>Cadastro de Frente Assistido</h1>
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
          <label>Assistidos</label>
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
        <button >Limpar</button>
        <button onClick={SaveForm}>Salvar</button>
      </form>
    </div>
    {/* Lista */}
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Assistidos</th>
        </tr>
      </thead>
      <tbody>
        {frentesList.map((sacola) => (
          <tr key={sacola.id}>
            <td>
              {editingItemId === sacola.id ? (

                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />) : (
                sacola.nome
              )}
            </td>
            <td>
              {editingItemId === sacola.id ? (
                <input
                  type="text"
                  name="assistidos"
                  value={formData.assistidos}
                  onChange={handleChange}
                />) : (
                sacola.assistidos
              )}
            </td>

            <td>
              {editingItemId === sacola.id ? (
                <button onClick={() => handleSaveEdit(sacola.id)}>Salvar</button>
              ) : (
                <button onClick={() => handleEditClick(sacola.id)}>Editar</button>
              )}
              <button onClick={() => handleDelete(sacola)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


  </>
  );
};


export default FrenteAssistidosForm;
