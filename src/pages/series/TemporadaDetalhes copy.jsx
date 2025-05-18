import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'
import ModernSpinner from '../../components/ModernSpinner'

const TemporadaDetalhes = () => {
  const [serie, setSerie] = useState(null)
  const [elenco, setElenco] = useState([])
  const [episodes, setEpisodes] = useState([])
  const { id, season_number } = useParams()

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [serieRes, elencoRes, temporadaRes] = await Promise.all([
          apiFilmes.get(`tv/${id}?language=pt-BR`),
          apiFilmes.get(`tv/${id}/credits?language=pt-BR`),
          apiFilmes.get(`tv/${id}/season/${season_number}?language=pt-BR`),
        ])

        setSerie(serieRes.data)
        setElenco(elencoRes.data.cast)
        setEpisodes(temporadaRes.data.episodes)
      } catch (error) {
        console.error('Erro ao buscar dados da temporada:', error)
      }
    }

    fetchDados()
  }, [id, season_number])

  if (!serie) return <ModernSpinner />

  return (
    <Container className="letra mt-4">
      <h1 className="mb-4 text-center">{season_number}ª Temporada</h1>

      <Row>
        {episodes.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="h-100 shadow-sm text-white"
              style={{ backgroundColor: '#111' }}
            >
              <Card.Img
                variant="top"
                src={
                  item.still_path
                    ? `https://image.tmdb.org/t/p/w500${item.still_path}`
                    : 'https://via.placeholder.com/500x281?text=Sem+Imagem'
                }
                alt={item.name}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <Card.Body>
                <Card.Title className="fs-6 text-white">
                  <strong>{item.episode_number} - {item.name}</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TemporadaDetalhes
