import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner, Alert, Form, Pagination, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiFilmes from '../../services/apiFilmes';
import dayjs from 'dayjs';

const FilmesLancamentos = () => {
  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [idioma, setIdioma] = useState('pt-BR');

  const hoje = dayjs().format('YYYY-MM-DD'); // data atual

  useEffect(() => {
    const buscarLancamentos = async () => {
      setLoading(true);
      try {
        const res = await apiFilmes.get('movie/upcoming', {
          params: {
            language: idioma,
            page: pagina,
            region: 'BR' // opcional: melhora os resultados locais
          }
        });

        const filtrados = res.data.results.filter(filme => filme.release_date >= hoje);

        setFilmes(filtrados);
        setTotalPaginas(res.data.total_pages > 500 ? 500 : res.data.total_pages); // limite do TMDB
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar os lançamentos.');
      } finally {
        setLoading(false);
      }
    };

    buscarLancamentos();
  }, [pagina, idioma]);

  const mudarIdioma = (e) => {
    setIdioma(e.target.value);
    setPagina(1); // reinicia a página ao trocar idioma
  };

  const paginacao = [];
  for (let i = 1; i <= Math.min(5, totalPaginas); i++) {
    paginacao.push(
      <Pagination.Item key={i} active={i === pagina} onClick={() => setPagina(i)}>
        {i}
      </Pagination.Item>
    );
  }

  if (loading) return <Spinner animation="border" variant="light" className="d-block mx-auto mt-5" />;
  if (erro) return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>;

  return (
    <Container className="letra container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h1 className="text-white mb-0">Lançamentos</h1>
        <Form.Select value={idioma} onChange={mudarIdioma} style={{ maxWidth: 200 }}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">Inglês</option>
          <option value="es-ES">Espanhol</option>
        </Form.Select>
      </div>

      <Row>
        {filmes.map(item => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="bg-dark text-white h-100">
              {item.poster_path ? (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  loading="lazy"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: '375px', backgroundColor: '#444' }}>
                  <span>Imagem não disponível</span>
                </div>
              )}
                <Card.Body md={4}>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.overview || "Sinopse indisponível no idioma selecionado."}
                        <br />
                        <strong>Popularidade:</strong> {item.popularity}<br />
                        <strong>Lançamento:</strong> {item.release_date}
                    </Card.Text>
                    <Link className="btn btn-danger btn-sm mt-2" to={`/filmes/${item.id}`}>Detalhes</Link>
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-3">
        <Pagination>{paginacao}</Pagination>
      </div>
    </Container>
  );
};

export default FilmesLancamentos;
