import axios from 'axios';

const apiFilmes = axios.create({
  baseURL: 'https://lingering-frost-c1a3.mayconborgesgato717.workers.dev', 
});

export default apiFilmes;
