import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'

const TemporadaDetalhes = () => {

    const [serie, setSerie] = useState({})
    const [elenco, setElenco] = useState([])
    const [episodes, setEpisodes] = useState([])
    const params = useParams()
    useEffect(() => {

        apiFilmes.get('tv/' + params.id + '?language=pt-BR').then(resultado => {
            setSerie(resultado.data)
            //console.log(resultado.data) //pra ver no console o resultado
        })
        apiFilmes.get('tv/' + params.id + '/credits?language=pt-BR').then(resultado => {
            setElenco(resultado.data.cast)
            //console.log(resultado.data) //pra ver no console o resultado
        })
        apiFilmes.get('tv/' + params.id + '/season/' + params.season_number + '?language=pt-BR').then(resultado => {
            setEpisodes(resultado.data.episodes)
            //console.log(resultado.data) //pra ver no console o resultado
        })

    }, [params])

    return (
        <div className='letra'>
            {!serie.id && <h1>Carregando... Aguarde!</h1>}

            {serie.id &&
                <>

                    <h1> {params.season_number} Temporada </h1>

                    <Row>
                        {episodes.map(item =>(

                        
                        <Col md={3} className='mb-3'>
                            <Card title={item.name} >
                                <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.still_path} />
                                <Card.Text >
                                    <strong>{item.episode_number} - {item.name}</strong>
                                </Card.Text>
                            </Card>
                        </Col>
                        ))}


                    </Row>


                </>
            }



        </div>
    )
}

export default TemporadaDetalhes