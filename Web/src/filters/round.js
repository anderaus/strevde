export function round(value, decimals) {
  if (!value) {
    value = 0;
  }
  if (!decimals) {
    decimals = 0;
  }
  return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};
