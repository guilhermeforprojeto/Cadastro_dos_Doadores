import axios from 'axios';
// Define as configurações padrões quando cria a instância
export const API = axios.create({
  // baseURL: 'http://systembeebygui.ddns.net:8022/'
  baseURL: 'http://localhost:8080/'
  // baseURL: 'http://192.168.15.2:8080'
  // baseURL: 'http://systembeebygui.ddns.net:8022'
});

// // Altera as configurações padrões após a instância ser criada
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
