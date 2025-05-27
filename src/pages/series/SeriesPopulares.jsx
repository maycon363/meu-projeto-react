import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Card, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import ModernSpinner from '../../components/ModernSpinner';

const SeriesPopulares = () => {
  const [series, setSeries] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [idioma, setIdioma] = useState('pt-BR');

  useEffect(() => {
    document.title = 'Séries Populares - App Filmes';

    const buscarSeriesPopulares = async () => {
      setLoading(true);
      try {
        const res = await apiFilmes.get('tv/popular', {
          params: { language: idioma, page: pagina }
        });
        setSeries(res.data.results);
        setTotalPaginas(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar as séries populares.');
      } finally {
        setLoading(false);
      }
    };

    buscarSeriesPopulares();
  }, [pagina, idioma]);

  const mudarIdioma = (e) => {
    setIdioma(e.target.value);
    setPagina(1);
  };

  const paginacao = [];
  for (let i = 1; i <= Math.min(5, totalPaginas); i++) {
    paginacao.push(
      <Pagination.Item key={i} active={i === pagina} onClick={() => setPagina(i)}>
        {i}
      </Pagination.Item>
    );
  }

  if (loading) return <ModernSpinner />;
  if (erro) return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;

  return (
    <Container className="letra mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h1 className="text-white mb-0">Séries Populares</h1>
        <Form.Select value={idioma} onChange={mudarIdioma} style={{ maxWidth: 200 }}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">Inglês</option>
          <option value="es-ES">Espanhol</option>
        </Form.Select>
      </div>

      {series.length === 0 ? (
        <Alert variant="warning" className="text-center">Nenhuma série encontrada.</Alert>
      ) : (
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
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ height: '375px', backgroundColor: '#444' }}>
                    <span>Imagem não disponível</span>
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.overview || "Sinopse indisponível no idioma selecionado."}
                    <br />
                    <strong>Popularidade:</strong> {item.popularity}<br />
                    <strong>Idioma original:</strong> {item.original_language.toUpperCase()}
                  </Card.Text>
                  <Link className="btn btn-danger btn-sm mt-2" to={`/series/${item.id}`}>
                    Detalhes
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center mt-3">
        <Pagination>{paginacao}</Pagination>
      </div>
    </Container>
  );
};

export default SeriesPopulares;
