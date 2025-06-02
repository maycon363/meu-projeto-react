import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../index.css'

const Menu = () => {
    return (
        <Navbar expand="lg" className='neon-navbar py-4 px-6' variant="dark" bg="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Início</Navbar.Brand>

                {/* Botão hamburguer para telas pequenas */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Menu colapsável */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Filmes" menuVariant="dark">
                            <NavDropdown.Item as={Link} to="/filmes/lancamentos">Lançamentos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/filmes/cartaz">Cartaz</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/filmes/populares">Populares</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/filmes/Prox-estreias">Próximas Estreias</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Séries" menuVariant="dark">
                            <NavDropdown.Item as={Link} to="/series/no-ar">No Ar</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/series/populares">Populares</NavDropdown.Item> 
                            <NavDropdown.Item as={Link} to="/series/estrelando-hoje">Estrelando Hoje</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/series/bem-avaliadas">Mais bem avaliadas</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Atores" menuVariant="dark">
                            <NavDropdown.Item as={Link} to="/atores/populares">Atores Populares</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
