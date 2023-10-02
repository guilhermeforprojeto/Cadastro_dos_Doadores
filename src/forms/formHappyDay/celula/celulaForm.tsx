import React, { useState, useEffect } from 'react';
import './celulaForm.css'
import { API } from '../../../assets/api/api';
import Notify from '../../../components/react-toastify/react-toastify';
import { Noti } from '../../../components/react-toastify/Noti';
import { readItemFromStorage } from '../../../services/storage/storage';
import { tCelula } from './celula';

interface OpcaoCelula {
  codigo: string;
}

const CelulaForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<tCelula[]>([]);
  const [sacolasOP, setSacolasOP] = useState<OpcaoCelula[]>([])
  const [sacolasData, setSacolasData] = useState<OpcaoCelula[]>([])
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });
  const [celulaList, setCelulaList] = useState<tCelula[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [dataHoraAtual, setDataHoraAtual] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<OpcaoCelula[]>([]);
  const [opensearchResults, OpensetSearchResults] = useState<Boolean>(false);

  const [namePreSearch, setNamePreSearch] = useState('')

  const [handleformData, setHandleFormData] = useState<any>({
    id: '',
    nome: '',
    nomeLider: '',
    contato: '',
    obs: ''
  });
  const [formData, setFormData] = useState<tCelula>({
    id: '',
    nomeLider: '',
    nome: '',
    contato: '',
    obs: '',
  });

  useEffect(() => {
    loadCelulaes()
    const interval = setInterval(() => {
      setDataHoraAtual(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initialOptions: OpcaoCelula[] = [
      // ...suas opções de Celula inicial
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
      nome: handleformData.nome,
      nomeLider: handleformData.nomeLider,
      contato: handleformData.contato,
      obs: handleformData.obs,
    })
  };
  // const handleEditClick = (id: string) => {
  //   setEditingItemId(id);
  //   // Preencha os campos de edição com os dados atuais da sacola
  //   const CelulaAtual = sacolas.find((sacola) => sacola.id === id);
  //   if (CelulaAtual) {
  //     setFormData({ ...formData, ...CelulaAtual });
  //   }
  // };

  // const handleSaveEdit = async (id: string) => {
  //   try {
  //     const response = await API.put('/Celulaes/' + id, formData); // Substitua pela sua rota de API
  //     loadCelulaes();
  //     setFormData({
  //       id: '',
  //       status: '',
  //       nome: '',
  //       contato: '',
  //       Celula: [],
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
      nome: handleformData.nome,
      nomeLider: handleformData.nomeLider,
      contato: handleformData.contato,
      obs: handleformData.obs,
    })
    // console.log(formData)
    // console.log(handleformData)
  };
  const handleDelete = async (FRENTE: tCelula) => {
    try {
      await API.delete(`/Celulaes/${FRENTE.id}`); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: "FRENTE " + FRENTE.nome + " deletada com suceso" })
      loadCelulaes();
    } catch (error) {
      setNoti({ tipo: "error", msg: "Não foi possivel apagar " })
      console.error('Erro ao excluir FRENTE:', error);
    }
  };


  const handleAdicionarCelula = () => {
    if (handleformData.CelulaAtual && !handleformData.CelulaSelecionadas.includes(handleformData.CelulaAtual)) {
      setHandleFormData({
        id: '',
        status: '',
        nome: '',
        contato: '',
        CelulaSelecionadas: [],
        CelulaAtual: '',
        obs: ''
      })
      setHandleFormData({
        ...handleformData,
        CelulaSelecionadas: [...handleformData.CelulaSelecionadas, handleformData.CelulaAtual],
        CelulaAtual: '',
      });
      OpensetSearchResults(false)
      setSearchTerm('')
    } else {
      console.error("Sacolainha já cadastrada!")
      setNoti({ tipo: 'error', msg: 'Sacolainha já cadastrada!' })
    }
  };

  const handleRemoverCelula = (Celula: string) => {
    const novaListaCelula = handleformData.CelulaSelecionadas.filter(
      (item: string) => item !== Celula
    );

    setHandleFormData({
      ...handleformData,
      CelulaSelecionadas: novaListaCelula,
    });
  };


  // const HandleSearch = (e: string) => {
  //   console.log(e);
  //   setNamePreSearch(e);

  //   const namePreSearch = sacolasOP.filter((opcao: OpcaoCelula) =>
  //     opcao.codigo.toLowerCase().includes(e.toLowerCase())
  //   );

  //   console.log(namePreSearch);
  // };

  const loadCelulaes = async () => {
    try {
      const response = await API.get('/celula'); // Substitua pela sua rota de API
      // setSacolasOP(response.data);
      console.log(response.data);
      setCelulaList(response.data.Celulaes)
      // setSacolasOP(response.data.Celulaes)
      // console.log(response.data.Celulaes)
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      setCelulaList([])
      setNoti({ tipo: "error", msg: `Erro: ${error}` })
      console.error('Erro ao carregar sacolas:', error);
    }

  };
  const SaveForm = async () => {
    console.warn("SaveForm diz")
    console.log(formData)
    console.log(handleformData)
    try {
      const response = await API.post('/celula', formData); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: response.data.message })
      // console.log(response.data)
      if (response.status === 201) {
        setNoti({ tipo: "success", msg: response.data.message })
        // console.log('Celula criado com sucesso!', response.data.message);
        setHandleFormData({
          id: '',
          nome: '',
          nomeLider: '',
          contato: '',
          obs: ''
        });
        // setFormData({
        //   id: '',
        //   status: '',
        //   nome: '',
        //   contato: '',
        //   Celula: [],
        //   obs: ''
        // });
        loadCelulaes()
      } else {
        console.error('Erro ao criar Celula:', response.data.message);

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
    <div className='containerCelula-header'>Assiste responsavel: {readItemFromStorage("NomeAssistente")} em {dataHoraAtual.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'long',
      timeStyle: 'medium'
    })} </div>
    <div className='containerCelulaBodyPage'>
      <div className='containerCelulaCelula'>
        <h1>Cadastro de Celula</h1>
        <form className='containerCelula-form' onSubmit={handleSubmit}>
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
            <label>Nome do Líder</label>
            <input
              type="number"
              name="nomeLider"
              value={handleformData.nomeLider}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contato  do Líder</label>
            <input
              type="text"
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
          <div className='actBtnCelula'>

            <button >Limpar</button>
            <button onClick={SaveForm}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
    {/* LISTA 
    LISTA 
    LISTA  */}
    {/* <div className='tableContainerFrenteAss' >
      <label>Listagem - Celulaes</label>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nome Lider</th>
            <th>Contato</th>
            <th>obs</th>
          </tr>
        </thead>
        {formData.id.length == 0 ?
          celulaList.map((sacola) => (
            <tbody>
              <tr key={sacola.id}>
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
                      name="obs"
                      value={formData.obs}
                      onChange={handleChange}
                    />) : (
                    sacola.obs
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(sacola)}>Excluir</button>
                </td>
              </tr>
            </tbody>
          ))
          : <span><h1>Não existe Celula cadastradas</h1></span>}
      </table>
    </div> */}

  </>
  );
};

export default CelulaForm;
