import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Container, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import ModernSpinner from '../../components/ModernSpinner';

const AtoresDetalhes = () => {
  const [ator, setAtor] = useState({});
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resAtor, resFilmes] = await Promise.all([
          apiFilmes.get(`person/${id}?language=pt-BR`),
          apiFilmes.get(`person/${id}/movie_credits?language=pt-BR`)
        ]);

        setAtor(resAtor.data);
        setFilmes(resFilmes.data.cast);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os detalhes do ator.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  if (loading) return <ModernSpinner />

  if (erro) {
    return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;
  }

  return (
    <Container className="letra mt-4 fade-in">
      <h1 className="text-white mb-4">{ator.name}</h1>

      <Row>
        <Col md={4}>
          <Card className="bg-dark text-white">
            {ator.profile_path ? (
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`}
                alt={ator.name}
              />
            ) : (
              <div className="text-center py-5" style={{ backgroundColor: '#444' }}>
                <p>Imagem não disponível</p>
              </div>
            )}
          </Card>
        </Col>

        <Col md={8}>
          <p><strong>Nome:</strong> {ator.name}</p>
          <p><strong>Aniversário:</strong> {ator.birthday || 'Não informado'}</p>
          <p><strong>Local de nascimento:</strong> {ator.place_of_birth || 'Não informado'}</p>
          <p><strong>Biografia:</strong> {ator.biography || 'Biografia não disponível em português.'}</p>

          <Button variant="danger" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Col>
      </Row>

      <h2 className="text-white mt-5">Conhecido(a) por</h2>
      <Row>
        {filmes.map(filme => (
          <Col key={filme.id} md={3} className="mb-4">
            <Card className="bg-dark text-white h-100">
              <Link to={`/filmes/${filme.id}`}>
                {filme.backdrop_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`}
                    alt={filme.title}
                  />
                ) : (
                  <div className="text-center py-5" style={{ backgroundColor: '#444' }}>
                    <p>Imagem não disponível</p>
                  </div>
                )}
              </Link>
              <Card.Body>
                <Card.Title className="text-truncate">{filme.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AtoresDetalhes;
