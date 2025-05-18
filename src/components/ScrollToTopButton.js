import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑ Topo
        </button>
      )}

      <style>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #00aa55; /* Verde */
          color: #ffffff;       /* Branco */
          border: none;
          padding: 12px 16px;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          transition: background 0.3s ease;
          z-index: 1000;
        }

        .scroll-to-top:hover {
          background: #008f47; /* Verde escuro no hover */
        }

        @media (max-width: 480px) {
          .scroll-to-top {
            padding: 10px 14px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
