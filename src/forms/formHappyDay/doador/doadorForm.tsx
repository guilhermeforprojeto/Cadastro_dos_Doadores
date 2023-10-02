import React, { useState, useEffect } from 'react';
import './doadorForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';
import { readItemFromStorage } from '../../../services/storage/storage';
import { Doador } from './doador';

interface OpcaoSacolinha {
  codigo: string;
}

const DoadorForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<Doador[]>([]);
  const [sacolasOP, setSacolasOP] = useState<OpcaoSacolinha[]>([])
  const [sacolasData, setSacolasData] = useState<OpcaoSacolinha[]>([])
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });
  const [doadorList, setDoadorList] = useState<Doador[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<OpcaoSacolinha[]>([]);
  const [opensearchResults, OpensetSearchResults] = useState<Boolean>(false);

  const [namePreSearch, setNamePreSearch] = useState('')

  const [handleformData, setHandleFormData] = useState<any>({
    id: '',
    nome: '',
    status: '',
    contato: '',
    sacolinhasSelecionadas: [],
    sacolinhaAtual: '',
    obs: ''
  });
  const [formData, setFormData] = useState<Doador>({
    id: '',
    status: '',
    nome: '',
    contato: '',
    sacolinhas: [''],
    obs: '',
  });

  useEffect(() => {
    loadDoadores()
    loadSacolas();
    const interval = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initialOptions: OpcaoSacolinha[] = [
      // ...suas opções de sacolinha inicial
    ];
    setSacolasOP(initialOptions);
  }, []);

  // Atualize a lista de resultados à medida que o usuário digita
  useEffect(() => {
    const filteredResults = sacolasOP.filter((opcao) =>
      opcao.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);

    console.log(searchResults)
  }, [searchTerm, sacolasOP]);

  const HandleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHandleFormData({ ...handleformData, [e.target.name]: e.target.value, status: "Doada" });
    setFormData({
      id: handleformData.id,
      status: handleformData.status,
      nome: handleformData.nome,
      contato: handleformData.contato,
      sacolinhas: handleformData.sacolinhasSelecionadas,
      obs: handleformData.obs,
    })
  };
  // const handleEditClick = (id: string) => {
  //   setEditingItemId(id);
  //   // Preencha os campos de edição com os dados atuais da sacola
  //   const doadorAtual = sacolas.find((sacola) => sacola.id === id);
  //   if (doadorAtual) {
  //     setFormData({ ...formData, ...doadorAtual });
  //   }
  // };

  // const handleSaveEdit = async (id: string) => {
  //   try {
  //     const response = await API.put('/doadores/' + id, formData); // Substitua pela sua rota de API
  //     loadDoadores();
  //     setFormData({
  //       id: '',
  //       status: '',
  //       nome: '',
  //       contato: '',
  //       sacolinhas: [],
  //       obs: ''
  //     });
  //     setNoti({ tipo: "success", msg: response.data.message })
  //     // if (response.status === 201) {
  //     //   setNoti({ tipo: "success", msg: response.data.message })
  //     //   console.log('Sacola criada com sucesso!', response.data.message);
  //     // } else {
  //     //   console.error('Erro ao criar sacola:', response.data.message);
  //     // }
  //   }
  //   catch (error) {
  //     setNoti({ tipo: "error", msg: "Erro ao criar sacola" })
  //     console.error('Erro ao criar sacola:', error);
  //   }
  //   // Implemente a lógica para salvar as alterações na sacola com o ID especificado
  //   // Normalmente, você faria uma chamada à API para atualizar os dados no servidor
  //   // Aqui, você pode apenas cancelar o modo de edição
  //   setEditingItemId(null);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      id: handleformData.id,
      status: handleformData.status,
      nome: handleformData.nome,
      contato: handleformData.contato,
      sacolinhas: handleformData.sacolinhasSelecionadas,
      obs: handleformData.obs,
    })
    // console.log(formData)
    // console.log(handleformData)
  };
  const handleDelete = async (FRENTE: Doador) => {
    try {
      await API.delete(`/doadores/${FRENTE.id}`); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: "FRENTE " + FRENTE.nome + " deletada com suceso" })
      loadDoadores();
    } catch (error) {
      setNoti({ tipo: "error", msg: "Não foi possivel apagar " })
      console.error('Erro ao excluir FRENTE:', error);
    }
  };


  const handleAdicionarSacolinha = () => {
    if (handleformData.sacolinhaAtual && !handleformData.sacolinhasSelecionadas.includes(handleformData.sacolinhaAtual)) {
      setHandleFormData({
        id: '',
        status: '',
        nome: '',
        contato: '',
        sacolinhasSelecionadas: [],
        sacolinhaAtual: '',
        obs: ''
      })
      setHandleFormData({
        ...handleformData,
        sacolinhasSelecionadas: [...handleformData.sacolinhasSelecionadas, handleformData.sacolinhaAtual],
        sacolinhaAtual: '',
      });
      OpensetSearchResults(false)
      setSearchTerm('')
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


  // const HandleSearch = (e: string) => {
  //   console.log(e);
  //   setNamePreSearch(e);

  //   const namePreSearch = sacolasOP.filter((opcao: OpcaoSacolinha) =>
  //     opcao.codigo.toLowerCase().includes(e.toLowerCase())
  //   );

  //   console.log(namePreSearch);
  // };

  const loadDoadores = async () => {
    try {
      const response = await API.get('/doadores'); // Substitua pela sua rota de API
      // setSacolasOP(response.data);
      console.log(response.data);
      setDoadorList(response.data.doadores)
      // setSacolasOP(response.data.doadores)
      // console.log(response.data.doadores)
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      setNoti({ tipo: "error", msg: `Erro: ${error}` })

      console.error('Erro ao carregar sacolas:', error);
    }

  };
  const loadSacolas = async () => {
    try {
      const response = await API.get('/sacolas'); // Substitua pela sua rota de API
      setSacolasOP(response.data.sacolas);
      setSacolasData(response.data)
      // console.log("sacolasData")
      // console.log(sacolasData)
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      setNoti({ tipo: "error", msg: `Erro: ${error}` })

      console.error('Erro ao carregar sacolas:', error);
    }
  };
  const SaveForm = async () => {
    console.warn("SaveForm diz")
    console.log(formData)
    console.log(handleformData)
    try {
      const response = await API.post('/doadores', formData); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: response.data.message })
      // console.log(response.data)
      if (response.status === 201) {
        setNoti({ tipo: "success", msg: response.data.message })
        // console.log('Doador criado com sucesso!', response.data.message);
        setHandleFormData({
          id: '',
          nome: '',
          status: '',
          contato: '',
          sacolinhasSelecionadas: [],
          sacolinhaAtual: '',
          obs: ''
        });
        // setFormData({
        //   id: '',
        //   status: '',
        //   nome: '',
        //   contato: '',
        //   sacolinhas: [],
        //   obs: ''
        // });
        loadDoadores()
      } else {
        console.error('Erro ao criar Doador:', response.data.message);

      }
    }
    catch (error) {
      const deuruim: any = error
      setNoti({ tipo: "error", msg: `${deuruim.response.data.message}` })
      console.warn(formData)
    }
  }


  return (<>
    <Notify notificacao={noti} />
    <div className='containerDoador-header'>Assiste responsavel: {readItemFromStorage("NomeAssistente")} em {dataHoraAtual.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'long',
      timeStyle: 'medium'
    })} </div>
    <div className='containerDoadorDoadorBodyPage'>
      <div className='containerDoadorDoador'>
        <h1>Cadastro de Doador</h1>
        <form className='containerDoador-form' onSubmit={handleSubmit}>
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
              type="number"
              name="contato"
              value={handleformData.contato}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Observações</label>
            <input
              type="text"
              name="obs"
              value={handleformData.obs}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div>
              <label>Pesquisar Sacolinhas</label>
              <div>
                <input
                  type="text"
                  onClick={() => OpensetSearchResults(true)}
                  name="sacolinhasDisponiveis"
                  placeholder="Pesquisar sacolinha..."
                  value={searchTerm}
                  onChange={(e) => {
                    setHandleFormData({ ...handleformData, sacolinhaAtual: searchTerm })
                    HandleSearch(e.target.value)
                  }}
                />Selecione a sacolinha:
                {!opensearchResults ?
                  "" :

                  <ul >
                    {searchResults.map((opcao: OpcaoSacolinha) => (
                      opcao.codigo == searchTerm ? "Código " + searchTerm + " selecionado" :
                        <li onClick={() => {
                          setSearchTerm(opcao.codigo)
                          setHandleFormData({ ...handleformData, sacolinhaAtual: searchTerm })
                        }}
                          value={opcao.codigo}
                          key={opcao.codigo}>
                          {opcao.codigo}</li>
                    ))}
                  </ul>

                }

              </div>

              {/* <select
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
              </select> */}
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
    </div>
    {/* LISTA 
    LISTA 
    LISTA  */}
    <div className='tableContainerFrenteAss' >
      <label>Listagem - Doadores</label>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Sacolinhas</th>
            <th>obs</th>
            <th>Ações</th>
          </tr>
        </thead>
        {formData.id.length == 0 ?
          doadorList.map((sacola) => (
            <tbody>
              <tr key={sacola.id}>
                <td>
                  {editingItemId === sacola.id ? (

                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    />) : (
                    sacola.status
                  )}
                </td>
                <td>
                  {editingItemId === sacola.id ? (

                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />) : (
                    <div><label>Nome: </label> {sacola.nome}</div>
                  )}
                </td>
                <td>
                  {editingItemId === sacola.id ? (
                    <input
                      type="text"
                      name="contato"
                      value={formData.contato}
                      onChange={handleChange}
                    />) : (
                    <div><label>Contato: </label> {sacola.contato}</div>
                  )}
                </td>
                <td>
                  {editingItemId === sacola.id ? (
                    <input
                      type="text"
                      name="sacolinhas"
                      value={formData.sacolinhas}
                      onChange={handleChange}
                    />) : (
                    <div><label>Cod. Sacolinhas: </label> {sacola.sacolinhas.join(", ")}</div>

                  )}
                </td>            <td>
                  {editingItemId === sacola.id ? (
                    <input
                      type="text"
                      name="obs"
                      value={formData.obs}
                      onChange={handleChange}
                    />) : (
                    sacola.obs
                  )}
                </td>
                <td>
                  {/* {editingItemId === sacola.id ? (
                    <button onClick={() => handleSaveEdit(sacola.id)}>Salvar</button>
                  ) : (
                    <button onClick={() => handleEditClick(sacola.id)}>Editar</button>
                  )} */}
                  <button onClick={() => handleDelete(sacola)}>Excluir</button>
                </td>
              </tr>
            </tbody>
          ))
          : <span><h1>Não existe Frentes cadastradas</h1></span>}
      </table>
    </div>

  </>
  );
};

export default DoadorForm;
