import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Container, Alert, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import ModernSpinner from '../../components/ModernSpinner'

const SerieDetalhes = () => {
  const [serie, setSerie] = useState({});
  const [elenco, setElenco] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resSerie, resElenco] = await Promise.all([
          apiFilmes.get(`tv/${id}?language=pt-BR`),
          apiFilmes.get(`tv/${id}/credits?language=pt-BR`)
        ]);

        setSerie(resSerie.data);
        setTemporadas(resSerie.data.seasons);
        setElenco(resElenco.data.cast);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os detalhes da série.');
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
      <h1 className="text-white mb-4">{serie.name}</h1>

      <Row>
        <Col md={4}>
          <Card className="bg-dark text-white">
            {serie.poster_path ? (
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                alt={serie.name}
              />
            ) : (
              <div className="text-center py-5" style={{ backgroundColor: '#444' }}>
                <p>Imagem não disponível</p>
              </div>
            )}
          </Card>
        </Col>

        <Col md={8}>
          <p><strong>Título Original:</strong> {serie.original_name}</p>
          <p><strong>Popularidade:</strong> {serie.popularity}</p>
          <p><strong>Data de Lançamento:</strong> {serie.first_air_date}</p>
          <p><strong>Gêneros:</strong> {serie.genres?.map(g => g.name).join(', ') || 'Não informado'}</p>
          <p><strong>Sinopse:</strong> {serie.overview || 'Sinopse não disponível.'}</p>

          <Button variant="danger" onClick={() => navigate(-1)}>Voltar</Button>
        </Col>
      </Row>

      <h2 className="text-white mt-5">Temporadas</h2>
      <Row>
        {temporadas.map(temp => (
          <Col key={temp.id} md={2} className="mb-4">
            <Card className="bg-dark text-white h-100">
              <Link to={`/series/${serie.id}/temporada/${temp.season_number}`}>
                {temp.poster_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${temp.poster_path}`}
                    alt={temp.name}
                  />
                ) : (
                  <div className="text-center py-4" style={{ backgroundColor: '#444' }}>
                    <p>Sem imagem</p>
                  </div>
                )}
              </Link>
              <Card.Body>
                <Card.Title className="text-truncate">{temp.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-white mt-5">Elenco</h2>
      <Row>
        {elenco.map(ator => (
          <Col key={ator.id} md={2} className="mb-4">
            <Card className="bg-dark text-white h-100">
              <Link to={`/ator/${ator.id}`}>
                {ator.profile_path ? (
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`}
                    alt={ator.name}
                  />
                ) : (
                  <div className="text-center py-4" style={{ backgroundColor: '#444' }}>
                    <p>Sem imagem</p>
                  </div>
                )}
              </Link>
              <Card.Body>
                <Card.Title className="text-truncate">{ator.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SerieDetalhes;
