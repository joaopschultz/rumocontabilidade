import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const WHATSAPP_LINK =
    "https://wa.me/5531999993189?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20RUMO.";
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-indigo-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-indigo-950 tracking-tight">
              RUMO
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#metodo"
              className="text-slate-600 hover:text-indigo-900 font-medium transition-colors"
            >
              Método
            </a>
            <a
              href="#processo"
              className="text-slate-600 hover:text-indigo-900 font-medium transition-colors"
            >
              Nosso Processo
            </a>
            <a
              href="#qualificar"
              className="text-slate-600 hover:text-indigo-900 font-medium transition-colors"
            >
              Qualificar
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl"
            >
              Falar com um Consultor
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <a
            href="#metodo"
            className="block text-lg font-medium text-slate-700 hover:text-indigo-900 transition-colors py-2"
            onClick={() => setMenuOpen(false)}
          >
            Método
          </a>
          <a
            href="#processo"
            className="block text-lg font-medium text-slate-700 hover:text-indigo-900 transition-colors py-2"
            onClick={() => setMenuOpen(false)}
          >
            Nosso Processo
          </a>
          <a
            href="#qualificar"
            className="block text-lg font-medium text-slate-700 hover:text-indigo-900 transition-colors py-2"
            onClick={() => setMenuOpen(false)}
          >
            Qualificar
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-indigo-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            Falar com um Consultor
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
