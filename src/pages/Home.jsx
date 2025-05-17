import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiFilmes from '../services/apiFilmes'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const Home = () => {
  const [destaque, setDestaque] = useState(null)
  const [emBreve, setEmBreve] = useState(null)
  const [series, setSeries] = useState([])
  const [topSeries, setTopSeries] = useState([])
  const [seriesDrama, setSeriesDrama] = useState([])
  const [seriesComedia, setSeriesComedia] = useState([])
  const [seriesAcao, setSeriesAcao] = useState([])
  const [seriesScifi, setSeriesScifi] = useState([])
  const [seriesDoc, setSeriesDoc] = useState([])
  const [seriesRomance, setSeriesRomance] = useState([])
  const [seriesCrime, setSeriesCrime] = useState([])
  const [transacoes, setTransacoes] = useState([])

  useEffect(() => {
    apiFilmes.get('/movie/popular?language=pt-BR').then(res => setDestaque(res.data.results[0]))
    apiFilmes.get('/movie/upcoming?language=pt-BR').then(res => setEmBreve(res.data.results[0]))
    apiFilmes.get('/tv/popular?language=pt-BR').then(res => setSeries(res.data.results))
    apiFilmes.get('/tv/top_rated?language=pt-BR').then(res => setTopSeries(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=18&language=pt-BR').then(res => setSeriesDrama(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=35&language=pt-BR').then(res => setSeriesComedia(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=10759&language=pt-BR').then(res => setSeriesAcao(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=10765&language=pt-BR').then(res => setSeriesScifi(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=99&language=pt-BR').then(res => setSeriesDoc(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=10749&language=pt-BR').then(res => setSeriesRomance(res.data.results))
    apiFilmes.get('/discover/tv?with_genres=80,9648&language=pt-BR').then(res => setSeriesCrime(res.data.results))

    // Mock ou API real de transações (para exemplo, peguei filmes recentes)
    apiFilmes.get('/movie/now_playing?language=pt-BR').then(res => setTransacoes(res.data.results))
  }, [])

  const renderSwiperSection = (title, data, path = 'series') => (
    <>
     <h2 className="text-2xl md:text-3xl font-bold mt-12 px-4 neon-title">{title}</h2>
      <div className="mt-6 px-4 relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          navigation={{
            nextEl: `.swiper-button-next-${title}`,
            prevEl: `.swiper-button-prev-${title}`,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="group"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={`/${path}/${item.id}`}
                className="block bg-zinc-900 rounded-lg overflow-hidden shadow-lg poster-hover"
              >
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.name || item.title}
                    className="w-full h-[320px] object-cover transition duration-300 group-hover:brightness-75"
                  />
                </div>
              </Link>
              <div className="p-2 text-center bg-zinc-800">
                <h4 className="text-sm md:text-base font-medium truncate">
                  {item.name || item.title}
                </h4>
              </div>
            </SwiperSlide>
          ))}
          <div className={`swiper-button-prev-${title} text-white text-xl hover:scale-110 transition hidden md:flex`} />
          <div className={`swiper-button-next-${title} text-white text-xl hover:scale-110 transition hidden md:flex`} />
        </Swiper>
      </div>
    </>
  )

  return (
    <div className="min-h-screen text-white pb-16 fade-in">
      {/* Banner de Destaque */}
      {destaque && (
        <div
          className="relative h-[80vh] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${destaque.backdrop_path})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="relative p-6 md:p-12 max-w-3xl z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{destaque.title}</h1>
            <p className="text-sm md:text-base">
              {destaque.overview.slice(0, 250)}...
            </p>
            <Link
              to={`/filmes/${destaque.id}`}
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      )}

      {/* Em Breve */}
      {emBreve && (
        <div
          className="relative h-[60vh] bg-cover bg-center  flex items-end justify-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${emBreve.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="relative p-6 md:p-12 max-w-2xl z-10 text-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🍿 Em breve nos cinemas
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{emBreve.title}</h3>
            <p className="text-sm md:text-base mb-6 line-clamp-3">
              {emBreve.overview}
            </p>
            <Link
              to={`/filmes/${emBreve.id}`}
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      )}

      {/* 🧾 Seção de Transações */}
      {renderSwiperSection('🧾 Transações Recentes', transacoes, 'filmes')}

      {/* Outras Seções de Séries */}
      {renderSwiperSection('🔥 Séries Populares', series)}
      {renderSwiperSection('⭐ Top Séries Avaliadas', topSeries)}
      {renderSwiperSection('🎭 Séries de Drama', seriesDrama)}
      {renderSwiperSection('😂 Séries de Comédia', seriesComedia)}
      {renderSwiperSection('🧨 Séries de Ação & Aventura', seriesAcao)}
      {renderSwiperSection('👽 Ficção Científica & Fantasia', seriesScifi)}
      {renderSwiperSection('🎥 Documentários', seriesDoc)}
      {renderSwiperSection('💘 Séries de Romance', seriesRomance)}
      {renderSwiperSection('🕵️‍♂️ Séries de Crime & Mistério', seriesCrime)}
    </div>
  )
}

export default Home