import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8080'
  // baseURL: ' http://38.56.22.53:8080/'
  // baseURL: 'http://192.168.15.2:8080'
  // baseURL: 'http://systembeebygui.ddns.net:8022/'

});
