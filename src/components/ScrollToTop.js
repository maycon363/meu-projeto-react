import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 50); // dá tempo para transições de rota ou loaders

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
