import React, { useMemo, useState } from "react";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

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
  defaultValue = 25000,
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

  // Correção: se a legenda é "por ano", multiplica por 12
  const savingsAnnual = useMemo(() => revenue * deltaPct * 12, [revenue, deltaPct]);

  return (
    <div className="mt-6 w-full">
      {/* Header */}
      <div className="text-center">
        <div className="text-sm text-slate-600">Seu faturamento mensal</div>

        <div
          className={`mt-1 text-2xl font-semibold transition-colors ${
            isDragging ? "text-indigo-600" : "text-slate-900"
          }`}
        >
          {formatBRL(revenue)}
        </div>
      </div>

      {/* Slider */}
      <div className="mt-4 px-1">
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

      {/* Resultado (clean, sem caixa) */}
      <div className="mt-5 flex items-baseline justify-between">
        <div>
          <div className="text-sm font-medium text-slate-700">Economia potencial</div>
          <div className="text-xs text-slate-500">estimativa anual</div>
        </div>

        <div
          className={`text-3xl font-bold text-emerald-600 transition-transform ${
            isDragging ? "scale-105" : ""
          }`}
        >
          {formatBRL(savingsAnnual)}
        </div>
      </div>
    </div>
  );
}
