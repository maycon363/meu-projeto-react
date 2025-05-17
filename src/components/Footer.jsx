// src/components/Footer.jsx
import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="neon-footer">
            <div className="max-w-6xl mx-auto px-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                    <div>
                        <p>
                            Este site foi desenvolvido para exibir informações de filmes e
                            séries populares usando a API do TMDB.
                        </p>
                    </div>

                    <div>
                        <ul>
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/filmes/cartaz">Filmes</Link></li>
                            <li><Link to="/series/no-ar">Séries</Link></li>
                            <li>
                            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li><a href="https://www.instagram.com/mmayconb_p/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://github.com/maycon363" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p>&copy; 2025 Projeto Filmes & Séries. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
