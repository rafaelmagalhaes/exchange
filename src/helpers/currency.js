const currency = (base, amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: `${base}`,
    minimumFractionDigits: 2,
  }).format(amount);
};

export default currency;
