import axios from 'axios';

const apiFilmes = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'pt-BR',
  }
});

export default apiFilmes;