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

  const mid = useMemo(() => Math.round(((min + max) / 2) / step) * step, [min, max, step]);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      {/* Título */}
      <div className="text-sm font-semibold text-slate-900">
        Quanto você pode estar deixando na mesa
      </div>

      {/* Valor principal (economia) */}
      <div className="mt-2 text-2xl font-semibold text-slate-900">
        {formatBRL(savings)}
      </div>

      {/* Slider */}
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

      {/* Linha: Faturamento + valor */}
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <div className="text-xs text-slate-500">Faturamento</div>
        <div className="text-xs font-medium text-slate-700">{formatBRL(revenue)}</div>
      </div>

      {/* Marcadores discretos */}
      <div className="mt-2 flex justify-between text-[11px] text-slate-400">
        <span>{formatBRL(min)}</span>
        <span>{formatBRL(mid)}</span>
        <span>{formatBRL(max)}</span>
      </div>
    </div>
  );
}
