
import React from 'react';

const Navbar: React.FC = () => {
  const WHATSAPP_LINK = "https://wa.me/5531999993189?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20RUMO.";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-indigo-950 tracking-tight">RUMO</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#metodo" className="text-slate-600 hover:text-indigo-900 font-medium transition-colors">Método</a>
            <a href="#processo" className="text-slate-600 hover:text-indigo-900 font-medium transition-colors">Nosso Processo</a>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-900 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/20"
            >
              Falar com um Consultor
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
