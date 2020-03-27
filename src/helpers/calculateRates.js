const calculateRates = (from, rate, type) => {
  let value = parseFloat(rate) * from;
  if (type === "reverse-exchange") {
    value = from / parseFloat(rate);
  }
  return value;
};

export default calculateRates;
