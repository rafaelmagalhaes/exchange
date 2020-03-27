import React from "react";
import currency from "../helpers/currency";

const Balance = ({ balance, suffix }) => {
  return (
    <p className="has-text-primary">
      Balance: <b>{currency(suffix, balance)}</b>
    </p>
  );
};

export default Balance;
