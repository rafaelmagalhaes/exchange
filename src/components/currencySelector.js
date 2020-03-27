import React from "react";
import currency from "../helpers/currency";
import Balance from "./balance";

const CurrencySelector = ({
  accounts,
  fromCurrency,
  toCurrency,
  ignoreCurrency,
  handleCurrencyChange,
  sign,
}) => {
  const suffix = sign === "-" ? fromCurrency : toCurrency;
  return (
    <div className="has-text-centered">
      <div className="field">
        <div className="control">
          <div className="select is-primary" style={{ width: "100%" }}>
            <select
              style={{
                width: "100%",
                textAlign: "center",
                textAlignLast: "center",
              }}
              defaultValue={suffix}
              onChange={(event) =>
                handleCurrencyChange(event.target.value, sign)
              }
            >
              {Object.keys(accounts).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Balance suffix={suffix} balance={accounts[suffix]} />
    </div>
  );
};

export default CurrencySelector;
