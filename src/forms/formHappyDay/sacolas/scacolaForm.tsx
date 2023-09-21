import React, { useState, useEffect } from 'react';
import './scacolaForm.css'
import { ToastContainer, toast } from 'react-toastify';
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

const SacolaForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<Sacola[]>([]);
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' });

  const [formData, setFormData] = useState<Sacola>({
    id: '',
    frenteAssistidaId: '',
    assistidoId: '',
    doadorId: '',
    codigo: '',
    conteudo: '',
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const loadSacolas = async () => {
    try {
      const response = await API.get('/sacolas'); // Substitua pela sua rota de API
      setSacolas(response.data.sacolas);
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      console.error('Erro ao carregar sacolas:', error);
    }
  };

  useEffect(() => {
    loadSacolas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/sacolas', formData); // Substitua pela sua rota de API
      loadSacolas();
      setFormData({
        id: '',
        frenteAssistidaId: '',
        assistidoId: '',
        doadorId: '',
        codigo: '',
        conteudo: '',
      });
      setNoti({ tipo: "success", msg: response.data.message })

      if (response.status === 201) {
        setNoti({ tipo: "success", msg: response.data.message })
        console.log('Sacola criada com sucesso!', response.data.message);
      } else {
        console.error('Erro ao criar sacola:', response.data.message);
      }
    }
    catch (error) {
      setNoti({ tipo: "error", msg: "Erro ao criar sacola" })
      console.error('Erro ao criar sacola:', error);
    }
  };


  const handleEditClick = (id: string) => {
    setEditingItemId(id);
    // Preencha os campos de edição com os dados atuais da sacola
    const sacolaAtual = sacolas.find((sacola) => sacola.id === id);
    if (sacolaAtual) {
      setFormData({ ...formData, ...sacolaAtual });
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const response = await API.put('/sacolas/' + id, formData); // Substitua pela sua rota de API
      loadSacolas();
      setFormData({
        id: '',
        frenteAssistidaId: '',
        assistidoId: '',
        doadorId: '',
        codigo: '',
        conteudo: '',
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

  const handleDelete = async (sacola: Sacola) => {
    try {
      await API.delete(`/sacolas/${sacola.id}`); // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: "Sacola " + sacola.codigo + " deletada com suceso" })
      loadSacolas();
    } catch (error) {
      setNoti({ tipo: "error", msg: "Não foi possivel apagar " })
      console.error('Erro ao excluir sacola:', error);
    }
  };

  return (
    <div className='container'>
      <Notify notificacao={noti} />
      <form className='container-form' onSubmit={handleSubmit}>
        <h1>Cadastro de Sacolinhas</h1>
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
          <label>Conteúdo</label>
          <input
            type="text"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Frente Assistida</label>
          <input
            type="text"
            name="assistidoId"
            value={formData.frenteAssistidaId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Assistido</label>
          <input
            type="text"
            name="assistidoId"
            value={formData.assistidoId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Criar Sacola</button>
      </form>

      <br></br>
      <hr />
      {/* LISTA 
      LISTA 
      LISTA  */}
      <h2>Sacolas</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Conteúdo</th>
            <th>Frente Assistida</th>
            <th>Assistido</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sacolas.map((sacola) => (
            <tr key={sacola.id}>
              <td>
                {editingItemId === sacola.id ? (
                  <input
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                  />
                ) : (
                  sacola.codigo
                )}
              </td>
              <td>
                {editingItemId === sacola.id ? (
                  <input
                    type="text"
                    name="conteudo"
                    value={formData.conteudo}
                    onChange={handleChange}
                  />
                ) : (
                  sacola.conteudo
                )}
              </td>
              <td>
                {editingItemId === sacola.id ? (
                  <input
                    type="text"
                    name="assistidoId"
                    value={formData.assistidoId}
                    onChange={handleChange}
                  />
                ) : (
                  sacola.assistidoId
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
    </div>
  );
};

export default SacolaForm;
