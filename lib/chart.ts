export const generateMiniChartData = (
  baseValue: number,
  change24h: number,
): number[] => {
  const isUp = change24h >= 0;
  const data: number[] = [];

  let current = baseValue;

  for (let i = 0; i < 7; i++) {
    // Small random fluctuation around trend
    const noise = (Math.random() - 0.5) * 0.005; // ±0.25% wiggle

    // Step is biased according to trend
    const step = isUp ? Math.abs(noise) + 0.002 : -Math.abs(noise) - 0.002;

    // Update current value
    current = current * (1 + step);
    data.push(Number(current.toFixed(6)));
  }

  return data;
};
