export function getPlaceWord(count: number) {
  if (count === 1) return 'місце';
  if (count > 1 && count < 5) return 'місця';
  return 'місць';
}
