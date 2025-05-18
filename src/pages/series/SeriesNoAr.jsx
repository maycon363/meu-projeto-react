import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import ModernSpinner from '../../components/ModernSpinner'


const SeriesNoAr = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarSeries = async () => {
      try {
        const res = await apiFilmes.get('tv/on_the_air', {
          params: { language: 'pt-BR' }
        });
        setSeries(res.data.results);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar as séries no ar.');
      } finally {
        setLoading(false);
      }
    };

    buscarSeries();
  }, []);

  if (loading) return <ModernSpinner />

  if (erro) {
    return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;
  }

  return (
    <Container className="letra mt-4 fade-in">
      <h1 className="text-white text-center mb-4">Séries no Ar</h1>
      <Row>
        {series.map(item => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-dark text-white h-100">
              {item.poster_path ? (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.name}
                  loading="lazy"
                  className="hover-zoom"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '375px', backgroundColor: '#444' }}>
                  <span>Imagem não disponível</span>
                </div>
              )}
              <Card.Body>
                <Card.Title>{item.original_name}</Card.Title>
                <Card.Text>
                  <strong>Popularidade:</strong> {item.popularity}
                </Card.Text>
                <Link className="btn btn-danger btn-sm mt-2" to={`/series/${item.id}`}>
                  Detalhes
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SeriesNoAr;
