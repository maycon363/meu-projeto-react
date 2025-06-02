import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import ModernSpinner from '../../components/ModernSpinner';

const ProxEstreias = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        const res = await apiFilmes.get('/movie/upcoming', {
          params: { language: 'pt-BR' }
        });
        setFilmes(res.data.results);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os filmes de próximas estreias.');
      } finally {
        setLoading(false);
      }
    };

    buscarFilmes();
  }, []);

  const getPosterPath = (path) =>
    path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  if (loading) return <ModernSpinner />;

  if (erro) {
    return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;
  }

  return (
    <Container className="letra mt-4 fade-in">
      <h1 className="text-white text-center mb-4">Próximas Estreias</h1>
      <Row>
        {filmes.map((filme) => (
          <Col key={filme.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="bg-dark text-white h-100 hover-zoom cursor-pointer"
              onClick={() => navigate(`/filmes/${filme.id}`)}
            >
              {filme.poster_path ? (
                <Card.Img
                  variant="top"
                  src={getPosterPath(filme.poster_path)}
                  alt={filme.title}
                  loading="lazy"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '375px', backgroundColor: '#444' }}>
                  <span>Imagem não disponível</span>
                </div>
              )}
              <Card.Body>
                <Card.Title className="text-truncate">{filme.title}</Card.Title>
                <Card.Text>
                  <strong>Data de Lançamento:</strong> {filme.release_date}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProxEstreias;
