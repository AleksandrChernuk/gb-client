export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  return res.json();
}

export function getWeatherLabel(code: number) {
  if (code === 0) return '☀️ Ясно';
  if (code <= 3) return '⛅ Хмарно';
  if (code <= 67) return '🌧️ Дощ';
  if (code <= 77) return '❄️ Сніг';
  if (code <= 99) return '⛈️ Гроза';
  return '';
}
