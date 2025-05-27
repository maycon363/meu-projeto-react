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
        <p className="loading-text">Carregando... aguarde!</p>
      </div>

      <style>{`
        .film-strip-loader {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at center, #2a2a2a 0%, #121212 80%);
          box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.05);
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          user-select: none;
          transition: background 0.5s ease;
          overflow-x: hidden;
          box-sizing: border-box;
          text-align: center;
        }

        .loading-text {
          margin-top: 24px;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-shadow: 0 0 5px rgba(255, 255, 0, 0.8);
        }

        .film-strip {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          background: #222;
          border: 4px solid #444;
          border-radius: 10px;
          padding: 12px 16px;
          box-shadow: 0 0 20px #000 inset;
          max-width: 95vw;
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

        @media (max-width: 768px) {
          .frame {
            width: 32px;
            height: 48px;
            border-width: 2px;
            border-radius: 4px;
          }
          .loading-text {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .film-strip {
            gap: 6px;
            padding: 8px 10px;
          }

          .frame {
            width: 26px;
            height: 38px;
          }

          .loading-text {
            font-size: 1rem;
            margin-top: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default FilmStripLoader;
