import React, { useState, useEffect } from 'react'
import './doacaoForm.css'
import { API } from '../../../assets/api/api'
import Notify from '../../../components/react-toastify/react-toastify'
import { Noti } from '../../../components/react-toastify/Noti'
import {
  addItemToStorage,
  readItemFromStorage,
  deleteItemFromStorage,
  clearItemFromStorage
} from '../../../services/storage/storage'
import { Doador } from './doacao'


const DoacaoForm: React.FC = () => {
  const [sacolas, setSacolas] = useState<Doador[]>([])
  const [noti, setNoti] = useState<Noti>({ tipo: '', msg: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHandleFormData({ ...handleformData, [e.target.name]: e.target.value })
  }
  const [doadorList, setDoadorList] = useState<Doador[]>([])
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const [handleformData, setHandleFormData] = useState<any>({
    id: '',
    nome: '',
    contato: '',
    sacolinhasSelecionadas: [],
    sacolinhaAtual: '',
  })
  const [formData, setFormData] = useState<Doador>({
    id: handleformData.id,
    nome: handleformData.nome,
    contato: handleformData.contato,
    sacolinhas: handleformData.sacolinhasSelecionadas,

  })

  const [dataHoraAtual, setDataHoraAtual] = useState(new Date())

  // Atualiza a data e hora a cada segundo
  useEffect(() => {

    loadDoadores()
    loadSacolas()
    const interval = setInterval(() => {
      setDataHoraAtual(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])





  const SaveForm = async () => {
    try {
      const response = await API.post('/doadores', formData) // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: response.data.message })
      console.warn(formData)

      setFormData({
        id: '',
        nome: '',
        contato: '',
        sacolinhas: [],
      })
      console.log(response)
      if (response.status === 201) {
        setNoti({ tipo: "success", msg: response.data.message })
        console.log('Doador criada com sucesso!', response.data.message)
      } else {
        console.error('Erro ao criar sacola:', response.data.message)
        console.warn(formData)

      }
    }
    catch (error) {
      const deuruim: any = error
      setNoti({ tipo: "error", msg: `${deuruim.response.data.message}` })
      console.warn(formData)

      // console.error('Erro ao criar sacola:', error)
      // console.log(error)
      // console.log(deuruim.response.data.message)
    }


  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({
      id: handleformData.id,
      nome: handleformData.nome,
      contato: handleformData.contato,
      sacolinhas: handleformData.sacolinhasSelecionadas,
    })
  }
  const handleDelete = async (FRENTE: Doador) => {
    try {
      await API.delete(`/doadores/${FRENTE.id}`) // Substitua pela sua rota de API
      setNoti({ tipo: "success", msg: "FRENTE " + FRENTE.nome + " deletada com suceso" })
      loadSacolas()
    } catch (error) {
      setNoti({ tipo: "error", msg: "Não foi possivel apagar " })
      console.error('Erro ao excluir FRENTE:', error)
    }
  }


  const loadSacolas = async () => {
    try {
      const response = await API.get('/sacolas') // Substitua pela sua rota de API
      setSacolasOP(response.data.sacolas)
      setSacolasData(response.data.sacolas)
      console.log("sacolasData")
      console.log(sacolasData)


      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      console.error('Erro ao carregar sacolas:', error)
    }
  }

  const loadDoadores = async () => {
    try {
      const response = await API.get('/doadores') // Substitua pela sua rota de API
      setDoadorList(response.data.doadores)
      console.log("doadorList")
      console.log(doadorList)
      setNoti({ tipo: "info", msg: response.data.message })
      // console.log(response)
    } catch (error) {
      console.error('Erro ao carregar sacolas:', error)
    }
  }

  interface OpcaoSacolinha {
    id: string
    codigo: string
    status: string
    nome: string
    assistentesocial: string
  }
  const [sacolasOP, setSacolasOP] = useState<OpcaoSacolinha[]>([])
  const [sacolasData, setSacolasData] = useState<OpcaoSacolinha[]>([])


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
      })
    } else {
      console.error("Sacolainha já cadastrada!")
      setNoti({ tipo: 'error', msg: 'Sacolainha já cadastrada!' })
    }
  }

  const handleRemoverSacolinha = (sacolinha: string) => {
    const novaListaSacolinhas = handleformData.sacolinhasSelecionadas.filter(
      (item: string) => item !== sacolinha
    )

    setHandleFormData({
      ...handleformData,
      sacolinhasSelecionadas: novaListaSacolinhas,
    })
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
        <h1>Doações -  1604 Assistidos abençados </h1>
        {/* <h5>Gloria Deus</h5> */}
        {/* <form className='containerDoador-form' onSubmit={handleSubmit}>
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
            <div>
              <label>Sacolinhas Disponíveis:</label>
              <select
                name="sacolinhasDisponiveis"
                value={handleformData.sacolinhaAtual}
                onChange={(e) => {
                  setHandleFormData({ ...handleformData, sacolinhaAtual: e.target.value })
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
        </form> */}
      </div>
    </div>
    <div className='tableContainerFrenteAss' >
      <label>Listgem - Doadores</label>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Sacolinhas</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        {formData.id.length == 0 ?
          doadorList.map((doador) => (
            <tbody>
              <tr key={doador.id}>
                <td>
                  {editingItemId === doador.id ? (

                    <input
                      type="text"
                      name="nome"
                      value={doador.nome}
                      onChange={handleChange}
                    />) : (
                    <span> sadasd</span>
                  )}
                </td>
                <td>
                  {editingItemId === doador.id ? (

                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />) : (
                    doador.nome
                  )}
                </td>
                <td>
                  {editingItemId === doador.id ? (
                    <input
                      type="text"
                      name="assistidos"
                      value={formData.contato}
                      onChange={handleChange}
                    />) : (
                    doador.contato
                  )}
                </td>
                <td>
                  {editingItemId === doador.id ? (
                    <input
                      type="text"
                      name="assistidos"
                      value={formData.sacolinhas}
                      onChange={handleChange}
                    />) : (
                    doador.sacolinhas.join(", ")
                  )}
                </td>
                <td>
                  {editingItemId === doador.id ? (
                    <input
                      type="text"
                      name="assistidos"
                      value={formData.sacolinhas}
                      onChange={handleChange}
                    />) : (
                    doador.sacolinhas.join(", ")
                  )}
                </td>
                <td>
                  {/* {editingItemId === doador.id ? (
                    <button onClick={() => handleSaveEdit(doador.id)}>Salvar</button>
                  ) : (
                    <button onClick={() => handleEditClick(doador.id)}>Editar</button>
                  )} */}
                  <button onClick={() => handleDelete(doador)}>Excluir</button>
                </td>
              </tr>
            </tbody>
          ))
          : <span><h1>Não existe Frentes cadastradas</h1></span>}
      </table>
    </div>

  </>
  )
}

export default DoacaoForm
