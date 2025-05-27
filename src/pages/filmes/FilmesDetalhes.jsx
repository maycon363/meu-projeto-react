import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'
import { motion } from 'framer-motion'
import ModernSpinner from '../../components/ModernSpinner'

const Detalhes = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState(null)
  const [elenco, setElenco] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')
  const [diretor, setDiretor] = useState(null)
  const [roteirista, setRoteirista] = useState(null)
  const [watchProviders, setWatchProviders] = useState([])

  useEffect(() => {
    apiFilmes.get(`/movie/${id}?language=pt-BR`).then(res => setFilme(res.data))
  
    apiFilmes.get(`/movie/${id}/credits?language=pt-BR`).then(res => {
      setElenco(res.data.cast.slice(0, 12))
  
      const equipe = res.data.crew
  
      const diretor = equipe.find(pessoa => pessoa.job === 'Director')
      const roteirista = equipe.find(pessoa =>
        ['Writer', 'Screenplay', 'Author'].includes(pessoa.job)
      )
  
      setDiretor(diretor)
      setRoteirista(roteirista)
    })

    apiFilmes.get(`/movie/${id}/watch/providers`).then(res => {
      const providers = res.data.results?.BR?.flatrate || []
      setWatchProviders(providers)
    })
  
    apiFilmes.get(`/movie/${id}/videos?language=pt-BR`).then(res => {
      const trailer = res.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
    })
  
  }, [id])
  

  const getPosterPath = path =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'

  const getProfilePath = path =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : 'https://via.placeholder.com/185x278?text=Sem+Foto'

  const renderStars = nota => '⭐'.repeat(Math.round(nota / 2))

  if (!filme) return <ModernSpinner />

  return (
    <motion.div
      className="min-h-screen px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Detalhes principais */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Poster do Filme */}
        <div className="relative w-[250px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={getPosterPath(filme.poster_path)}
            alt={filme.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-sm">

          {watchProviders.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm px-2 py-1 flex gap-2 items-center justify-center">
              {watchProviders.map(provider => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="h-5"
                />
              ))}
            </div>
          )}
          </div>
        </div>

        {/* Card com informações */}
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg flex-1 text-white flex flex-col justify-between">
          <div>
           

            <div className="flex flex-wrap gap-2 mb-4">
              {filme.genres.map(genero => (
                <span key={genero.id} className="bg-green-700 text-white px-3 py-1 rounded-full text-sm">
                  {genero.name}
                </span>
              ))}
            </div>

            <p><strong className="text-green-400">Idioma original:</strong> {filme.original_language.toUpperCase()}</p>
            <p><strong className="text-green-400">Idiomas falados:</strong> {filme.spoken_languages.map(l => l.name).join(', ')}</p>
            <p><strong className="text-green-400">Popularidade:</strong> {filme.popularity.toFixed(0)}</p>
            <p><strong className="text-green-400">Lançamento:</strong> {filme.release_date}</p>
            <p><strong className="text-green-400">Duração:</strong> {filme.runtime} minutos</p>
            <p><strong className="text-green-400">Produtoras:</strong> {filme.production_companies.map(p => p.name).join(', ')}</p>
            <p><strong className="text-green-400">Orçamento:</strong> ${filme.budget?.toLocaleString()}</p>
            <p><strong className="text-green-400">Receita:</strong>  ${filme.revenue.toLocaleString()}</p>
            <p><strong className="text-green-400">Países:</strong> {filme.production_countries.map(c => c.name).join(', ')}</p>
            {diretor && <p><strong className="text-green-400" >Diretor:</strong> {diretor.name}</p>}
            {roteirista && <p><strong className="text-green-400" >Roteirista:</strong> {roteirista.name}</p>}
            <p><strong className="text-green-400">Status:</strong> {filme.status}</p>

            <p><strong className="text-green-400">Nota:</strong> {renderStars(filme.vote_average)} ({filme.vote_average.toFixed(1)})</p>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-green-300">Sinopse</h2>
              <p className="text-justify text-sm">{filme.overview || 'Sinopse não disponível.'}</p>
            </div>
            <button
            onClick={() => navigate(-1)}
            className="mt-1 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          </div>       
        </div>
      </div>

      {trailerUrl && (
        <div className="mb-4">
          <h3 className="text-green-400">Trailer Oficial</h3>
          <div className="ratio ratio-16x9">
            <iframe
              src={trailerUrl} // ✅ correto
              title="Trailer do Filme"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Elenco */}
      {elenco.length > 0 && (
        <div className=" mb-10 ">
          <h3 className="text-2xl font-bold text-green-400 mb-4">Elenco</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {elenco.map(ator => (
              <div
                key={ator.id}
                className="card bg-black rounded-xl p-2 text-center hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/ator/${ator.id}`)}
              >
                <img
                  src={getProfilePath(ator.profile_path)}
                  alt={ator.name}
                  className="rounded w-full h-48 object-cover mb-2"
                />
                <p className="text-sm text-white font-medium truncate">{ator.name}</p>
                <p className="text-xs text-white truncate">{ator.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Detalhes
