import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.15.2:8080'
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 503) {
      // O servidor não está respondendo
      return axios({
        method: error.request.method,
        url: 'http://systembeebygui.ddns.net:8080' + error.request.url,
        data: error.request.data
      });
    }

    // Retorna o erro original
    return Promise.reject(error);
  }
);