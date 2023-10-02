import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Notificacao {
  tipo: string;
  msg: string;
}

interface Props {
  notificacao: Notificacao;
}

export default function Notify({ notificacao }: Props) {

  const Proptipo: string = notificacao.tipo
  const Propmsg: string = notificacao.msg

  useEffect(() => {
    if (notificacao.tipo && notificacao.msg) {
      // Certifique-se de que o tipo e a mensagem da notificação sejam válidos
      handleNotify();
      console.log("render notfi")
    }
  }, [notificacao]);


  const handleNotify = () => {
    switch (notificacao.tipo) {
      case 'info':
        toast.info(notificacao.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;
      case 'success':
        toast.success(notificacao.msg, {
          // Configuração de notificação de sucesso
        });
        break;
      case 'warning':
        toast.warning(notificacao.msg, {
          // Configuração de notificação de aviso
        });
        break;
      case 'error':
        toast.error(notificacao.msg, {
          // Configuração de notificação de erro
        });
        break;
      case 'default':
        toast(notificacao.msg, {
          // Configuração de notificação padrão
        });
        break;
      default:
        console.warn(`Tipo de notificação desconhecido: ${notificacao.tipo}`);
    }
  };

  return (

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />

  );
}
