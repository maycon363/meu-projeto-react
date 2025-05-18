import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Alert, Badge } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'
import getPosterPath from '../../components/getPosterPath'
import ModernSpinner from '../../components/ModernSpinner'

const FilmesDetalhes = () => {
  const [filme, setFilme] = useState({})
  const [atores, setAtores] = useState([])
  const [diretor, setDiretor] = useState(null)
  const [roteirista, setRoteirista] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resFilme = await apiFilmes.get(`movie/${id}?language=pt-BR`)
        const resCredits = await apiFilmes.get(`movie/${id}/credits?language=pt-BR`)
        const resVideos = await apiFilmes.get(`movie/${id}/videos?language=pt-BR`)

        setFilme(resFilme.data)
        setAtores(resCredits.data.cast)

        const crew = resCredits.data.crew
        setDiretor(crew.find(p => p.job === 'Director'))
        setRoteirista(crew.find(p => p.job === 'Writer' || p.job === 'Screenplay'))

        const trailerOficial = resVideos.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
        setTrailer(trailerOficial)

      } catch (err) {
        console.error(err)
        setErro('Erro ao carregar detalhes do filme.')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [id])

  const renderStars = (nota) => {
    const filledStars = Math.round(nota / 2)
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < filledStars ? '#ffc107' : '#555' }}>★</span>
      )
    }
    return stars
  }

  if (loading) return <ModernSpinner />
  if (erro) return <Alert variant="danger" className="text-center mt-4">{erro}</Alert>

  return (
    <div className="letra container mt-4">
      {!filme.id ? (
        <h1 className="text-center text-white">Filme não encontrado!</h1>
      ) : (
        <>
          <h1 className="text-white mb-4">{filme.title}</h1>

          <Row className="mb-4">
            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Img 
                  variant="top" 
                  src={getPosterPath(filme.poster_path)}
                />
              </Card>
            </Col>
            <Col md={8} className="text-white">
                <p><strong>Título Original:</strong> {filme.original_title}</p>
                <p><strong>Popularidade:</strong> {filme.popularity}</p>
                <p><strong>Data de Lançamento:</strong> {filme.release_date}</p>
                <p><strong>Orçamento:</strong> ${filme.budget?.toLocaleString()}</p>
                <p><strong>Gêneros:</strong> {filme.genres?.map((g, i) => (
                    <span key={g.id}>{g.name}{i < filme.genres.length - 1 ? ', ' : ''}</span>
                ))}</p>
                <p className="mt-3 mb-0 fw-bold text-warning" style={{ fontSize: '1.1rem' }}>
                    ⭐ Nota: {renderStars(filme.vote_average)} <span className="text-white">({filme.vote_average.toFixed(1)}/10)</span>
                </p>
                {diretor && <p><strong>Diretor:</strong> {diretor.name}</p>}
                {roteirista && <p><strong>Roteirista:</strong> {roteirista.name}</p>}
                <p><strong>Sinopse:</strong> {filme.overview}</p>

                <Button variant="danger" onClick={() => navigate(-1)}>Voltar</Button>
            </Col>
          </Row>

          {trailer && (
            <div className="mb-4">
              <h3 className="text-white">Trailer Oficial</h3>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer do Filme"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <h2 className="text-white mb-3">Elenco</h2>
          <Row>
            {atores.filter(a => a.profile_path).slice(0, 12).map(ator => (
              <Col key={ator.id} xs={6} sm={4} md={2} className="mb-4">
                <Card className="bg-dark text-white h-100 text-center">
                    <Link to={`/ator/${ator.id}`}>
                        <Card.Img 
                        variant="top" 
                        src={`https://image.tmdb.org/t/p/w500/${ator.profile_path}`} 
                        title={ator.name}
                        />
                    </Link>
                    <Card.Body>
                      <small>{ator.name}</small>
                    </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  )
}

export default FilmesDetalhes
