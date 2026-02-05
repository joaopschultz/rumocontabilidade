import React from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-900 font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold tracking-tight">RUMO</span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Contabilidade boutique e gestão estratégica focada em profissionais
              de saúde. Menos burocracia, mais decisão.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/contabilidaderumo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da RUMO"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com/company/contabilidaderumo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da RUMO"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navegação</h4>
            <ul className="space-y-4 text-white/60">
              <li>
                <a
                  href="#metodo"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Nosso Método
                </a>
              </li>
              <li>
                <a
                  href="#processo"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Nosso Processo
                </a>
              </li>
              <li>
                <a
                  href="#triagem"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fazer Triagem
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400" />
                <span>contato@contabilidaderumo.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400" />
                <span>+55 (31) 99999-3189</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-400" />
                <span>Belo Horizonte, MG</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">
              Receba insights sobre gestão para sua clínica.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-mail"
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <button className="bg-emerald-500 text-indigo-950 px-3 py-2 rounded-lg font-bold text-sm">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© 2026 RUMO Contabilidade & Gestão. Todos os direitos reservados.</p>
          <p>Responsável Técnico: João Paulo – CRC/XX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
