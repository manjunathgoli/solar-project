export function calculateSavings({ monthlyBill, tariff, roofArea, sunlightHours }) {
  const bill = Number(monthlyBill);
  const rate = Number(tariff);
  const roof = Number(roofArea);
  const sun = Number(sunlightHours);
  if (![bill, rate, roof, sun].every(Number.isFinite) || bill <= 0 || rate <= 0 || roof <= 0 || sun <= 0) {
    throw new Error('Enter positive numbers for bill, tariff, roof area and sunlight hours.');
  }
  const monthlyUnits = bill / rate;
  // Estimate PV size from usable roof area and 30-day generation at 80% system performance.
  const systemKw = Math.min(roof / 100, monthlyUnits / (sun * 30 * 0.8));
  const generation = systemKw * sun * 30 * 0.8;
  // Apply an 85% bill-offset assumption; long-term savings allow 10% for degradation.
  const savings = Math.min(bill, generation * rate * 0.85);
  const cost = Math.round(systemKw * 65000);
  const yearlySavings = Math.round(savings * 12);
  return {
    systemKw: Number(systemKw.toFixed(1)), estimatedCost: cost,
    monthlySavings: Math.round(savings), yearlySavings,
    paybackYears: Number((cost / Math.max(yearlySavings, 1)).toFixed(1)),
    savings25Years: Math.round(yearlySavings * 25 * 0.9),
    co2OffsetTonnes: Number((generation * 12 * 0.0007).toFixed(1)),
  };
}
