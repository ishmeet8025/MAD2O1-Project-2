/**
 * Simple currency fetch helper
 * Uses exchangerate.host which is free and doesn't require API key.
 */
export async function fetchRates(base='USD', target='CAD') {
  const url = `https://api.exchangerate.host/latest?base=${base}&symbols=${target}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response not ok');
  const data = await res.json();
  return data.rates[target];
}
