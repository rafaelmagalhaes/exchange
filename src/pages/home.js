import React, { useEffect, useState } from "react";
import {
  fetchRates,
  fetchAccounts,
  updateBase,
  ExchangeMoney,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import calculateRates from "../helpers/calculateRates";
import currency from "../helpers/currency";

import CurrencySelector from "../components/currencySelector";
import CurrencyInput from "react-currency-input";

const HomePage = ({
  rates,
  accounts,
  handleCurrencyChange,
  toCurrency,
  fromCurrency,
  handleCurrencyInputChange,
  amountToReceive,
  handleMoneyExchange,
  amountToExchange,
}) => {
  return (
    <div className="container section">
      <div className="columns">
        <div className="column ">
          {rates ? (
            <div>
              <div className="card">
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <p>You are Exchanging</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3">
                      <CurrencySelector
                        handleCurrencyChange={handleCurrencyChange}
                        fromCurrency={fromCurrency}
                        ignoreCurrency={toCurrency}
                        sign="-"
                        accounts={accounts}
                      />
                    </div>
                    <div className="column">
                      <div className="field">
                        <div className="control has-icons-left">
                          <CurrencyInput
                            className="input is-danger"
                            precision="2"
                            value={amountToExchange}
                            onChangeEvent={(event, maskedvalue, floatvalue) =>
                              handleCurrencyInputChange(
                                floatvalue,
                                fromCurrency
                              )
                            }
                            suffix={fromCurrency}
                          />
                          <span className="icon is-small  has-text-danger is-left">
                            <i className="fas fa-minus "></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <p>You are Receiving</p>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-3">
                      <CurrencySelector
                        handleCurrencyChange={handleCurrencyChange}
                        toCurrency={toCurrency}
                        ignoreCurrency={fromCurrency}
                        sign="+"
                        accounts={accounts}
                      />
                    </div>
                    <div className="column">
                      <div className="field">
                        <div className="control has-icons-left has-icons-right">
                          <CurrencyInput
                            className="input is-success"
                            precision="2"
                            onChangeEvent={(event, maskedvalue, floatvalue) =>
                              handleCurrencyInputChange(floatvalue, toCurrency)
                            }
                            value={amountToReceive}
                            suffix={toCurrency}
                          />
                          <span className="icon is-small has-text-success is-left">
                            <i className="fas fa-plus"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <div className="card-footer-item">
                    <div className="tag is-rounded is-medium has-text-primary  has-text-weight-bold has-background-grey-lighter is-outlined">
                      {currency(fromCurrency, 1)} ={" "}
                      {calculateRates(1, rates[toCurrency], "exchange")}
                    </div>
                  </div>
                  <div className="card-footer-item">
                    <button
                      className="button is-outlined is-primary"
                      disabled={
                        accounts[fromCurrency] < amountToExchange ||
                        toCurrency === fromCurrency
                      }
                      onClick={handleMoneyExchange}
                    >
                      Exchange
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectedHomePage = () => {
  const dispatch = useDispatch();
  const [toCurrency, setToCurrency] = useState("USD");
  const [amountToReceive, setAmountToReceive] = useState(0);
  const [amountToExchange, setAmountToExchange] = useState(0);

  useEffect(() => {
    dispatch(fetchRates());
    dispatch(fetchAccounts());
    const interval = setInterval(() => {
      dispatch(fetchRates());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const accounts = useSelector((state) => state.accounts);
  const exchanges = useSelector((state) => state.exchanges);
  const rates = exchanges.rates;
  let fromCurrency = exchanges.base;

  const handleCurrencyInputChange = (floatvalue, type) => {
    if (type === fromCurrency) {
      let exchanged = calculateRates(floatvalue, rates[toCurrency], "exchange");
      setAmountToExchange(floatvalue);
      setAmountToReceive(exchanged.toString());
    } else {
      let exchanged = calculateRates(
        floatvalue,
        rates[toCurrency],
        "reverse-exchange"
      );
      setAmountToExchange(exchanged);
      setAmountToReceive(floatvalue);
    }
  };
  const handleMoneyExchange = (e) => {
    e.preventDefault();
    dispatch(ExchangeMoney(amountToExchange, fromCurrency, toCurrency));
    //reset the input forms
    setAmountToExchange(0);
    setAmountToReceive(0);
  };
  const handleCurrencyChange = (value, sign) => {
    if (sign === "+") {
      setToCurrency(value);
    } else {
      fromCurrency = value;
      dispatch(updateBase(value));
    }

    dispatch(fetchRates());

    //reset the input forms
    setAmountToExchange(0);
    setAmountToReceive(0);
  };
  return (
    <HomePage
      rates={rates}
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
      accounts={accounts}
      handleCurrencyInputChange={handleCurrencyInputChange}
      amountToReceive={amountToReceive}
      amountToExchange={amountToExchange}
      handleCurrencyChange={handleCurrencyChange}
      handleMoneyExchange={handleMoneyExchange}
    />
  );
};
export default ConnectedHomePage;
