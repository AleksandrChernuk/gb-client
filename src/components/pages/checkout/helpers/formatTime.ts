export function formatTime(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}
