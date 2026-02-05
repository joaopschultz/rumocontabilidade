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

  const savings = useMemo(() => revenue * deltaPct, [revenue, deltaPct]);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
      {/* Faturamento + Slider */}
      <div className="text-center">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
          Seu faturamento mensal
        </span>
        <div
          className={`text-2xl font-bold mt-1 transition-colors ${
            isDragging ? "text-indigo-600" : "text-slate-800"
          }`}
        >
          {formatBRL(revenue)}
        </div>
      </div>

      <div className="mt-4">
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

      {/* Divisor sutil */}
      <div className="my-4 border-t border-dashed border-slate-200"></div>

      {/* Resultado */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-emerald-600 font-medium">
            Economia potencial
          </div>
          <div className="text-sm text-slate-500">por mês</div>
        </div>
        <div
          className={`text-3xl font-bold text-emerald-600 transition-transform ${
            isDragging ? "scale-110" : ""
          }`}
        >
          {formatBRL(savings)}
        </div>
      </div>
    </div>
  );
}

