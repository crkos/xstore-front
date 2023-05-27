export function convertToMxn(value, currency) {
  if (currency === "MXN") {
    return value;
  } else if (currency === "USD") {
    return value * 20;
  }
  return value;
}

export function convertToUsd(value, currency) {
  if (currency === "MXN") {
    return value / 20;
  } else if (currency === "USD") {
    return value;
  }
  return value;
}
