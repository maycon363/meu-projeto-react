import React from "react";

const FilmStripLoader = () => {
  return (
    <>
      <div className="film-strip-loader">
        <div className="film-strip">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="frame">
              <div className="frame-light" style={{ animationDelay: `${i * 0.2}s` }} />
            </div>
          ))}
        </div>
        <p className="loading-text">Carregando filme... aguarde!</p>
      </div>

      <style>{`
        .film-strip-loader {
          height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* Fundo com gradiente escuro e brilho suave */
          background: radial-gradient(circle at center, #2a2a2a 0%, #121212 80%);
          box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.05);
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          user-select: none;
          transition: background 0.5s ease;
        }

        .loading-text {
          margin-top: 24px;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-align: center;
          text-shadow: 0 0 5px rgba(255, 255, 0, 0.8);
        }

        .film-strip {
          display: flex;
          gap: 12px;
          background: #222;
          border: 4px solid #444;
          border-radius: 10px;
          padding: 12px 16px;
          box-shadow: 0 0 20px #000 inset;
          transition: box-shadow 0.3s ease;
        }

        .frame {
          width: 40px;
          height: 60px;
          background: #333;
          border: 3px solid #666;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          box-shadow:
            inset 0 0 6px #000,
            0 2px 6px rgba(0,0,0,0.5);
          transition: box-shadow 0.3s ease;
        }

        .frame-light {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent 40%, #ff3, #ff3 60%, transparent 80%);
          opacity: 0;
          animation: lightUp 2s linear infinite;
          filter: drop-shadow(0 0 4px #ffdb4d);
        }

        @keyframes lightUp {
          0% { opacity: 0; }
          20% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }

        @media (max-width: 480px) {
          .film-strip {
            gap: 8px;
            padding: 8px 12px;
          }
          .frame {
            width: 28px;
            height: 42px;
            border-width: 2px;
            border-radius: 4px;
          }
          .loading-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default FilmStripLoader;
