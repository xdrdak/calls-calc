function toFloat(x: string | number) {
  if (typeof x === "string") {
    return parseFloat(x);
  }
  return x;
}

export function calculateContract(quantity: string | number) {
  return function calculate(contractPrice: string | number) {
    return toFloat(quantity) * toFloat(contractPrice) * 100;
  };
}

export function contract(
  quantity: string | number,
  currentPrice: string | number,
  boughtPrice: string | number,
) {
  const calculate = calculateContract(quantity);
  const gains = calculate(currentPrice);
  const cost = calculate(boughtPrice);
  const delta = gains - cost;

  return {
    gains,
    cost,
    delta,
  };
}
