import React, { useEffect, useState } from 'react'
import {  Col, Row } from 'react-bootstrap'

import apiFilmes from '../../services/apiFilmes' //mega importante

const UltimoFilmeAdd = () => {

    const [filme, setFilme] = useState([])

    useEffect(() => {

        apiFilmes.get('movie/latest?language=pt-BR').then(resultado => {
            setFilme(resultado.data)
            console.log(resultado.data) //pra ver no console o resultado
        })

    }, [])

    //const params = useParams()

    return (
        <div className='letra'>
            <h1 className='text-center'>O filme é atualizado <strong>constantemente</strong> ID: {filme.id}</h1>
            
            <h1>{filme.title}</h1>

            <Row>
                
                <Col md={8}>
                    <p><strong>Título Original: </strong>{filme.original_title}</p>
                    <p><strong>Língua original: </strong>{filme.original_language}</p>
                    <p><strong>Status: </strong>{filme.status}</p>
                    <p><strong>Tempo de filme: </strong>{filme.runtime}</p>
                    
                </Col>
            </Row>
        </div>

    )
}

export default UltimoFilmeAdd