
Savingsslider · TSX
Copiar

import React, { useMemo, useState } from "react";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

// Converte posição do slider (0-100) para valor real (escala não-linear)
function sliderToValue(
  sliderPos: number,
  min: number,
  max: number,
  inflectionPoint: number,
  inflectionSliderPos: number
): number {
  if (sliderPos <= inflectionSliderPos) {
    const ratio = sliderPos / inflectionSliderPos;
    return Math.round((min + ratio * (inflectionPoint - min)) / 1000) * 1000;
  } else {
    const ratio = (sliderPos - inflectionSliderPos) / (100 - inflectionSliderPos);
    return Math.round((inflectionPoint + ratio * (max - inflectionPoint)) / 5000) * 5000;
  }
}

// Converte valor real para posição do slider
function valueToSlider(
  value: number,
  min: number,
  max: number,
  inflectionPoint: number,
  inflectionSliderPos: number
): number {
  if (value <= inflectionPoint) {
    const ratio = (value - min) / (inflectionPoint - min);
    return ratio * inflectionSliderPos;
  } else {
    const ratio = (value - inflectionPoint) / (max - inflectionPoint);
    return inflectionSliderPos + ratio * (100 - inflectionSliderPos);
  }
}

type Props = {
  min?: number;
  max?: number;
  defaultValue?: number;
  deltaPct?: number;
  inflectionPoint?: number;
  inflectionSliderPos?: number;
};

export default function SavingsSlider({
  min = 0,
  max = 200000,
  defaultValue = 15000,
  deltaPct = 0.215,
  inflectionPoint = 30000,
  inflectionSliderPos = 60,
}: Props) {
  const [sliderPos, setSliderPos] = useState<number>(
    valueToSlider(defaultValue, min, max, inflectionPoint, inflectionSliderPos)
  );
  const [isDragging, setIsDragging] = useState(false);

  const revenue = useMemo(
    () => sliderToValue(sliderPos, min, max, inflectionPoint, inflectionSliderPos),
    [sliderPos, min, max, inflectionPoint, inflectionSliderPos]
  );

  const savings = useMemo(() => revenue * deltaPct, [revenue, deltaPct]);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-center text-sm font-semibold text-slate-900">
        Quanto você pode estar deixando na mesa
      </div>

      <div
        className={`mt-3 text-center text-3xl font-semibold transition-all duration-200 ${
          isDragging ? "scale-105 text-emerald-600" : "text-slate-900"
        }`}
      >
        {formatBRL(savings)}
      </div>

      <div className="mt-5 px-1">
        {/* Labels nas pontas */}
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{formatBRL(min)}</span>
          <span>{formatBRL(max)}</span>
        </div>

        {/* Container do slider */}
        <div className="relative">
          {/* Tooltip flutuante */}
          <div
            className={`absolute -top-9 transform -translate-x-1/2 bg-indigo-950 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-150 pointer-events-none z-10 ${
              isDragging ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ left: `${sliderPos}%` }}
          >
            {formatBRL(revenue)}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-950"></div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="rumo-slider w-full"
            aria-label="Faturamento"
            style={
              {
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${sliderPos}%, #e2e8f0 ${sliderPos}%, #e2e8f0 100%)`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <div className="mt-2 text-center text-sm text-slate-600">
        <span className="text-slate-500">Faturamento</span>{" "}
        <span className="font-medium text-slate-700">{formatBRL(revenue)}</span>
      </div>
    </div>
  );
}
