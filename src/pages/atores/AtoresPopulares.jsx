import React, { useEffect, useState } from 'react';
import apiFilmes from '../../services/apiFilmes';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import ModernSpinner from '../../components/ModernSpinner';

const AtoresPopulares = () => {
  const [atores, setAtores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const getProfilePath = (path) =>
    path
      ? `https://image.tmdb.org/t/p/w300${path}`
      : 'https://via.placeholder.com/300x450?text=Sem+Foto';

  useEffect(() => {
    const fetchAtores = async () => {
      try {
        const response = await apiFilmes.get('/person/popular?language=pt-BR');
        setAtores(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar atores populares:', error);
        setErro('Erro ao carregar atores populares.');
        setLoading(false);
      }
    };

    fetchAtores();
  }, []);

  if (loading) return <ModernSpinner />;
  if (erro) return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;

  return (
    <div className="p-4">
      <h1 className="text-white text-center mb-4">Atores Populares</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {atores.map((ator) => (
          <div
            key={ator.id}
            className="bg-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-200 cursor-pointer"
            onClick={() => navigate(`/ator/${ator.id}`)}
          >
            <img
              src={getProfilePath(ator.profile_path)}
              alt={ator.name}
              className="w-full h-60 object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <p className="text-white text-base font-semibold truncate">{ator.name}</p>
              <p className="text-gray-400 text-sm truncate">
                {ator.character || 'Personagem não informado'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtoresPopulares;
