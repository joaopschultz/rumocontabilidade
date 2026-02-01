
import React from 'react';
import { FEATURES } from '../constants';

const FeaturesSection: React.FC = () => {
  return (
    <section id="metodo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">Diferenciais</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
            Muito mais que apenas guias de impostos.
          </p>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A RUMO nasceu para ser o braço direito de médicos e dentistas que buscam organização, economia e paz de espírito.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-indigo-950 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
