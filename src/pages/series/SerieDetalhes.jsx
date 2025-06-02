import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'
import { motion } from 'framer-motion'
import ModernSpinner from '../../components/ModernSpinner'

const SerieDetalhes = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [serie, setSerie] = useState(null)
  const [elenco, setElenco] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resSerie, resElenco] = await Promise.all([
          apiFilmes.get(`/tv/${id}?language=pt-BR`),
          apiFilmes.get(`/tv/${id}/credits?language=pt-BR`)
        ])
        setSerie(resSerie.data)
        setElenco(resElenco.data.cast.slice(0, 12) || [])
      } catch (err) {
        console.error(err)
        setErro('Erro ao carregar os detalhes da série.')
      }
    }
    carregarDados()
  }, [id])

  const getPosterPath = path =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'

  const getProfilePath = path =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : 'https://via.placeholder.com/185x278?text=Sem+Foto'

  const renderStars = nota => '⭐'.repeat(Math.round(nota / 2))

  if (erro) {
    return <div className="text-center text-red-500 font-bold mt-6">{erro}</div>
  }

  if (!serie) return <ModernSpinner />

  return (
    <motion.div
      className="min-h-screen px-4 py-8 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-[250px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={getPosterPath(serie.poster_path)}
            alt={serie.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg flex-1">
          <h1 className="text-3xl font-bold text-green-400 mb-2">{serie.name}</h1>

          <p><span className="text-green-400 font-medium">Idioma original:</span> {serie.original_language?.toUpperCase()}</p>
          <p><span className="text-green-400 font-medium">Gêneros:</span> {serie.genres?.map(g => g.name).join(', ')}</p>
          <p><span className="text-green-400 font-medium">Lançamento:</span> {serie.first_air_date}</p>
          <p><span className="text-green-400 font-medium">Último episódio:</span> {serie.last_air_date}</p>
          <p><span className="text-green-400 font-medium">Status:</span> {serie.status}</p>
          <p><span className="text-green-400 font-medium">Popularidade:</span> {serie.popularity?.toFixed(0)}</p>
          <p><span className="text-green-400 font-medium">Nota:</span> {renderStars(serie.vote_average)} ({serie.vote_average?.toFixed(1)})</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-green-300 mb-1">Sinopse</h2>
            <p className="text-sm text-justify">{serie.overview || 'Sinopse não disponível.'}</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full flex items-center gap-2 shadow transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
        </div>
      </div>

      {/* Elenco */}
      {elenco.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Elenco</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {elenco.map(ator => (
              <div
                key={ator.id}
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition text-center p-2"
                onClick={() => navigate(`/ator/${ator.id}`)}
              >
                <img
                  src={getProfilePath(ator.profile_path)}
                  alt={ator.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium truncate">{ator.name}</p>
                <p className="text-xs truncate text-green-300">{ator.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Temporadas */}
      {serie.seasons?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Temporadas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {serie.seasons.map((temporada) => (
              <Link
                key={temporada.id}
                to={`/series/${serie.id}/temporada/${temporada.season_number}`}
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={
                    temporada.poster_path
                      ? `https://image.tmdb.org/t/p/w500${temporada.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=Sem+Imagem'
                  }
                  alt={temporada.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-center truncate">{temporada.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default SerieDetalhes
