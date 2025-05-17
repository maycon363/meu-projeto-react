import './App.css';
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FilmesDetalhes from './pages/filmes/FilmesDetalhes';
import UltimoFilmeAdd from './pages/filmes/UltimoFilmeAdd';
import FilmesLancamentos from './pages/filmes/FilmesLancamentos';
import FilmesCartaz from './pages/filmes/FilmesCartaz';
import AtoresDetalhes from './pages/atores/AtoresDetalhes';

import SerieDetalhes from './pages/series/SerieDetalhes';
import TemporadaDetalhes from './pages/series/TemporadaDetalhes copy';
import SeriesNoAr from './pages/series/SeriesNoAr';
import { SeriesEstrelando } from './pages/series/SeriesEstrelando';
import Index from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="fundo">

      <BrowserRouter basename="/meu-projeto-react">
        <Menu />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index/>}></Route>
              <Route path="/filmes/lancamentos" element={<FilmesLancamentos/>}></Route>
              <Route path="/filmes/cartaz" element={<FilmesCartaz/>}></Route>
              <Route path="/filmes/ultimoAdicionado" element={<UltimoFilmeAdd/>}></Route>
              <Route path="/filmes/:id" element={<FilmesDetalhes/>}></Route>
              <Route path="/series/:id" element={<SerieDetalhes/>}></Route>
              <Route path="/ator/:id" element={<AtoresDetalhes/>}></Route>
              <Route path="/ator/:id" element={<AtoresDetalhes/>}></Route>
              <Route path="/series/:id/temporada/:season_number" element={<TemporadaDetalhes/>}></Route>
              <Route path="/series/no-ar" element={<SeriesNoAr/>}></Route>
              <Route path="/series/estrelando-hoje" element={<SeriesEstrelando/>}></Route>            
            </Routes>
          </main>
        <Footer />
      </BrowserRouter>
    
    </div>
  );
}

export default App;
