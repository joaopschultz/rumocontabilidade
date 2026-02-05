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
  const pct = useMemo(
    () => ((revenue - min) / (max - min)) * 100,
    [revenue, min, max]
  );

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-center text-sm font-semibold text-slate-900">
        Quanto você pode estar deixando na mesa
      </div>

      <div className="mt-3 text-center text-3xl font-semibold text-slate-900">
        {formatBRL(savings)}
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="rumo-slider w-full"
          aria-label="Faturamento"
          style={
            {
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
            } as React.CSSProperties
          }
        />
      </div>

      <div className="mt-3 text-center text-sm text-slate-600">
        <span className="text-slate-500">Faturamento</span>{" "}
        <span className="font-medium text-slate-700">{formatBRL(revenue)}</span>
      </div>
    </div>
  );
}