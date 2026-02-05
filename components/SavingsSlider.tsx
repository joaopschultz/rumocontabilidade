import React, { useMemo, useState } from 'react';

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

type SavingsSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  deltaPct?: number; // ex.: 0.215 (27,5% - 6%)
};

const SavingsSlider: React.FC<SavingsSliderProps> = ({
  min = 5000,
  max = 200000,
  step = 1000,
  defaultValue = 25000,
  deltaPct = 0.215,
}) => {
  const [revenue, setRevenue] = useState<number>(defaultValue);

  const savings = useMemo(() => revenue * deltaPct, [revenue, deltaPct]);
  const pct = useMemo(() => ((revenue - min) / (max - min)) * 100, [revenue, min, max]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-sm text-slate-500">{formatBRL(revenue)}</div>

        <div className="text-right">
          <div className="text-xl font-semibold text-slate-900">{formatBRL(savings)}</div>
        </div>
      </div>

      <div className="mt-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="w-full"
          style={
            {
              accentColor: '#10b981',
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
              height: 6,
              borderRadius: 9999,
              appearance: 'none',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

export default SavingsSlider;
