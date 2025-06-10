import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiFilmes from '../services/apiFilmes'
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

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
  const [trailers, setTrailers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [
        popRes,
        upcomingRes,
        popularTv,
        topRatedTv,
        dramaTv,
        comedyTv,
        actionTv,
        scifiTv,
        docTv,
        romanceTv,
        crimeTv,
        nowPlaying
      ] = await Promise.all([
        apiFilmes.get('/movie/popular?language=pt-BR'),
        apiFilmes.get('/movie/upcoming?language=pt-BR'),
        apiFilmes.get('/tv/popular?language=pt-BR'),
        apiFilmes.get('/tv/top_rated?language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=18&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=35&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=10759&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=10765&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=99&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=10749&language=pt-BR'),
        apiFilmes.get('/discover/tv?with_genres=80,9648&language=pt-BR'),
        apiFilmes.get('/movie/now_playing?language=pt-BR')
      ]);


      setDestaque(popRes.data.results[0]);
      setEmBreve(upcomingRes.data.results[0]);
      setSeries(popularTv.data.results);
      setTopSeries(topRatedTv.data.results);
      setSeriesDrama(dramaTv.data.results);
      setSeriesComedia(comedyTv.data.results);
      setSeriesAcao(actionTv.data.results);
      setSeriesScifi(scifiTv.data.results);
      setSeriesDoc(docTv.data.results);
      setSeriesRomance(romanceTv.data.results);
      setSeriesCrime(crimeTv.data.results);
      setTransacoes(nowPlaying.data.results);

      const trailersData = await Promise.all(
        nowPlaying.data.results.slice(0, 10).map(async (filme) => {
          const resVideo = await apiFilmes.get(`/movie/${filme.id}/videos?language=pt-BR`);
          const video = resVideo.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
          return video ? { ...video, filmeTitle: filme.title } : null;
        })
      );

      setTrailers(trailersData.filter(Boolean));
    };

    fetchData();
  }, []);

  const renderStars = nota => '⭐'.repeat(Math.round(nota / 2))

  const renderSwiperSection = (title, data, path = 'series') => (
    <>
      <h2 className="textd text-2xl md:text-3xl font-bold mt-2 px-4">
        {title}
      </h2>
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
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.name || item.title}
                  className="w-full h-[320px] object-cover transition duration-300"
                />
              </Link>
              <div className="p-2 text-center bg-zinc-800">
                <h4 className="text-sm md:text-base font-medium truncate">
                  {item.name || item.title}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )

  return (
    <div className="min-h-screen text-white pb-16 fade-in">
      <section
        className="banner relative h-[60vh] md:h-[75vh] bg-cover bg-center flex items-center justify-start px-4 md:px-8 overflow-hidden"
        style={{
          backgroundImage: destaque ? `url(https://image.tmdb.org/t/p/original/${destaque.backdrop_path})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent backdrop-blur-sm z-0" />
          <div
            className="relative z-10 p-4 md:p-12 rounded-xl w-full max-w-2xl text-white space-y-4 md:space-y-6 overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          >
          <h1
            style={{ fontSize: '1.25rem', textShadow: '2px 2px 8px rgba(0, 0, 0, 1)', wordBreak: 'break-word' }}
            className="font-extrabold leading-tight break-words max-w-full"
          >
            {destaque ? destaque.title : 'Carregando...'}
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg font-medium text-zinc-200 line-clamp-4"
            style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.9)' }}
          >
            <strong>Nota:</strong> {destaque ? `${renderStars(destaque.vote_average)} (${destaque.vote_average.toFixed(1)})` : 'Carregando...'}
          </p>
          <Link
            to={destaque ? `/filmes/${destaque.id}` : '#'}
            className="inline-block bg-green-600 hover:bg-green-600 text-white text-sm sm:text-base md:text-lg font-semibold px-5 md:px-7 py-2 md:py-3 rounded-xl shadow-2xl max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
            tabIndex={destaque ? 0 : -1}
          >
            Ver Detalhes
          </Link>
        </div>
      </section>




      {renderSwiperSection('🧾 Transações Recentes', transacoes, 'filmes')}
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

export default Home;
