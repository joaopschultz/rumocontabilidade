import React, { useMemo, useState } from "react";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

type Props = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  deltaPct?: number; // diferença direta (ex: 0.215)
};

export default function SavingsSlider({
  min = 5000,
  max = 200000,
  step = 1000,
  defaultValue = 25000,
  deltaPct = 0.215,
}: Props) {
  const [revenue, setRevenue] = useState<number>(defaultValue);

  const savings = useMemo(() => revenue * deltaPct, [revenue, deltaPct]);
  const pct = useMemo(() => ((revenue - min) / (max - min)) * 100, [revenue, min, max]);

  const presets = useMemo(() => {
    const values = [20000, 50000, 100000, 200000].filter((v) => v >= min && v <= max);
    // garante que bate no step
    return values.map((v) => Math.round(v / step) * step);
  }, [min, max, step]);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      {/* título */}
      <div className="text-sm font-semibold text-slate-900">
        Quanto você pode estar deixando na mesa
      </div>

      {/* valor principal centralizado */}
      <div className="mt-3 text-center text-3xl font-semibold text-slate-900">
        {formatBRL(savings)}
      </div>

      {/* presets (opcional, mas melhora muito a UX) */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {presets.map((v) => {
          const active = v === revenue;
          return (
            <button
              key={v}
              type="button"
              onClick={() => setRevenue(v)}
              className={[
                "rounded-full border px-3 py-1 text-xs transition",
                active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {formatBRL(v)}
            </button>
          );
        })}
      </div>

      {/* slider */}
      <div className="mt-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="w-full"
          aria-label="Faturamento"
          style={
            {
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
              height: 6,
              borderRadius: 9999,
              appearance: "none",
            } as React.CSSProperties
          }
        />
      </div>

      {/* linha mínima de contexto (sem poluir) */}
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-xs text-slate-500">Faturamento</div>
        <div className="text-xs font-medium text-slate-700">{formatBRL(revenue)}</div>
      </div>
    </div>
  );
}
