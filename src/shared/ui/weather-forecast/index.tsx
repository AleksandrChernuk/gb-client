'use client';

import { useEffect, useState } from 'react';

interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

const DAY_LABELS = ['Сьогодні', 'Завтра', 'Після'];

function getGradient(code: number) {
  if (code === 0) return 'linear-gradient(135deg, #fff8c0 0%, #ffe066 40%, #ffd93d 100%)';
  if (code <= 3) return 'linear-gradient(135deg, #e8f4ff 0%, #c2e0ff 50%, #a8d4ff 100%)';
  if (code <= 67) return 'linear-gradient(135deg, #dceeff 0%, #b8d8f8 50%, #93c5fd 100%)';
  if (code <= 77) return 'linear-gradient(135deg, #f0f4ff 0%, #dde8ff 50%, #c7d9ff 100%)';
  return 'linear-gradient(135deg, #e8e0ff 0%, #d4c5f9 50%, #c4b5fd 100%)';
}

function getShimmerColors(code: number): [string, string] {
  if (code === 0) return ['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)'];
  if (code <= 3) return ['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)'];
  if (code <= 67) return ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)'];
  if (code <= 77) return ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)'];
  return ['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)'];
}

function getBoxShadow(code: number) {
  if (code === 0) return '0 4px 20px rgba(255,200,40,0.45), 0 1px 4px rgba(0,0,0,0.06)';
  if (code <= 3) return '0 4px 20px rgba(147,197,253,0.45), 0 1px 4px rgba(0,0,0,0.06)';
  if (code <= 67) return '0 4px 20px rgba(96,165,250,0.4), 0 1px 4px rgba(0,0,0,0.06)';
  if (code <= 77) return '0 4px 20px rgba(196,181,253,0.4), 0 1px 4px rgba(0,0,0,0.06)';
  return '0 4px 20px rgba(167,139,250,0.45), 0 1px 4px rgba(0,0,0,0.06)';
}

function getTextColor(code: number) {
  return code === 0 ? '#7c4f08' : '#1e3a5f';
}

function getSubColor(code: number) {
  return code === 0 ? 'rgba(124,79,8,0.65)' : 'rgba(30,58,95,0.6)';
}

function getWeatherLabel(code: number) {
  if (code === 0) return 'Ясно';
  if (code <= 3) return 'Хмарно';
  if (code <= 51) return 'Мряка';
  if (code <= 67) return 'Дощ';
  if (code <= 77) return 'Сніг';
  return 'Гроза';
}

// Большие фоновые иконки
function BgSun() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: -8,
        right: -8,
        width: 52,
        height: 52,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,180,0.6) 0%, rgba(255,210,40,0.35) 60%, transparent 100%)',
        animation: 'sunPulse 3s ease-in-out infinite',
        zIndex: 0,
      }}
    />
  );
}

function BgCloud() {
  return (
    <div style={{ position: 'absolute', bottom: -4, right: -6, zIndex: 0, opacity: 0.3 }}>
      <div style={{ position: 'relative', width: 56, height: 36 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 56,
            height: 20,
            background: 'white',
            borderRadius: 100,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            background: 'white',
            borderRadius: '50%',
            top: 0,
            left: 8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
            background: 'white',
            borderRadius: '50%',
            top: 4,
            left: 28,
          }}
        />
      </div>
    </div>
  );
}

function BgRain() {
  return (
    <div style={{ position: 'absolute', bottom: -4, right: -6, zIndex: 0, opacity: 0.3 }}>
      <div style={{ position: 'relative', width: 50, height: 46 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            width: 50,
            height: 18,
            background: 'rgba(147,197,253,1)',
            borderRadius: 100,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 26,
            height: 26,
            background: 'rgba(147,197,253,1)',
            borderRadius: '50%',
            top: 0,
            left: 6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            background: 'rgba(147,197,253,1)',
            borderRadius: '50%',
            top: 4,
            left: 26,
          }}
        />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 8 + i * 12,
              width: 3,
              height: 10,
              borderRadius: 2,
              background: 'rgba(96,165,250,1)',
              animation: `rainDrop 1.2s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BgSnow() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 2,
        right: 4,
        zIndex: 0,
        opacity: 0.35,
        fontSize: 36,
        animation: 'bob 4s ease-in-out infinite',
      }}
    >
      ❄️
    </div>
  );
}

function BgIcon({ code }: { code: number }) {
  if (code === 0) return <BgSun />;
  if (code <= 3) return <BgCloud />;
  if (code <= 67) return <BgRain />;
  if (code <= 77) return <BgSnow />;
  return <div style={{ position: 'absolute', bottom: 2, right: 4, zIndex: 0, opacity: 0.3, fontSize: 32 }}>⚡</div>;
}

export function WeatherForecast({ daily, cityName }: { daily: WeatherDaily; cityName?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes sunPulse {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes bob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes rainDrop {
          0%,100% { opacity: 0.4; transform: translateY(0); }
          50%      { opacity: 1; transform: translateY(3px); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .weather-card {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        }
        .weather-card:hover {
          transform: translateY(-5px) scale(1.06) !important;
        }
      `}</style>

      <div className="inline-flex flex-col gap-2">
        {cityName && (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Погода · <span className="font-medium text-slate-500 dark:text-slate-400">{cityName}</span>
          </p>
        )}

        <div className="inline-flex gap-2">
          {daily.time.map((_, idx) => {
            const code = daily.weather_code[idx];
            const [c1, c2] = getShimmerColors(code);

            return (
              <div
                key={idx}
                className="weather-card"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: visible ? `cardIn 0.5s cubic-bezier(.34,1.56,.64,1) ${idx * 0.1}s both` : 'none',
                  background: getGradient(code),
                  boxShadow: getBoxShadow(code),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  cursor: 'default',
                }}
              >
                {/* фоновая иконка */}
                <BgIcon code={code} />

                {/* shimmer цветом погоды */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: `linear-gradient(105deg, ${c1} 30%, ${c2} 50%, ${c1} 70%)`,
                    backgroundSize: '200% auto',
                    animation: 'shimmer 3s linear infinite',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* текст поверх всего */}
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: getSubColor(code),
                    lineHeight: 1,
                  }}
                >
                  {DAY_LABELS[idx]}
                </span>
                <span
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    fontSize: 24,
                    fontWeight: 800,
                    color: getTextColor(code),
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {Math.round(daily.temperature_2m_max[idx])}°
                </span>
                <span style={{ position: 'relative', zIndex: 2, fontSize: 8, color: getSubColor(code), lineHeight: 1 }}>
                  {getWeatherLabel(code)}
                </span>
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 3, fontSize: 8, marginTop: 1 }}>
                  <span style={{ color: code === 0 ? '#b45309' : '#2563eb', fontWeight: 600 }}>
                    ↑{Math.round(daily.temperature_2m_max[idx])}°
                  </span>
                  <span style={{ color: getSubColor(code) }}>↓{Math.round(daily.temperature_2m_min[idx])}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
