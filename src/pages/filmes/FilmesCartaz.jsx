import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Alert } from 'react-bootstrap'
import getPosterPath from '../../components/getPosterPath'
import { Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'
import ModernSpinner from '../../components/ModernSpinner'

const FilmesCartaz = () => {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    apiFilmes.get('movie/now_playing?language=pt-BR')
      .then((res) => {
        setFilmes(res.data.results)
      })
      .catch((err) => {
        console.error('Erro ao buscar filmes em cartaz:', err)
        setErro('Ocorreu um erro ao carregar os filmes.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <ModernSpinner />
  if (erro) return <Alert variant="danger" className="mt-5 text-center">{erro}</Alert>

  return (
    <div className="letra container mt-4 mb-4 fade-in">
      <h1 className="neon-title text-center mb-3">🎬 Filmes em Cartaz</h1>
      
      <Row className="g-3"> 
        {filmes.map(filme => (
          <Col key={filme.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 poster-hover bg-dark text-white">
              <Card.Img
                variant="top"
                src={getPosterPath(filme.poster_path)}
                alt={filme.title}
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{filme.title}</Card.Title>
                <p><strong>Lançamento:</strong> {filme.release_date}</p>
                <p><strong>Nota:</strong> {filme.vote_average}</p>
                <Link to={`/filmes/${filme.id}`} className="btn btn-success w-100 mt-2">
                  Detalhes
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default FilmesCartaz
