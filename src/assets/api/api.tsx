import axios from 'axios';
// Define as configurações padrões quando cria a instância
export const API = axios.create({
  baseURL: 'http://localhost:8080'
});

// // Altera as configurações padrões após a instância ser criada
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;