export const REQUEST_EXCHANGE = "REQUEST_EXCHANGE";
export const RECIEVE_EXCHANGE = "RECIEVE_EXCHANGE";
export const REQUEST_RATES = "REQUEST_RATES";
export const RECIEVE_RATES = "RECIEVE_RATES";
export const UPDATE_BASE = "UPDATE_BASE";
const requestRates = () => {
  return { type: REQUEST_RATES };
};

const recieveRates = (payload) => {
  return {
    type: RECIEVE_RATES,
    exchanges: payload,
  };
};

const newBase = (base) => {
  return {
    type: UPDATE_BASE,
    base: base,
  };
};

const recieveExchange = (accounts) => {
  return { type: RECIEVE_EXCHANGE, accounts: accounts };
};
const requestExchange = () => {
  return { type: REQUEST_EXCHANGE };
};

export const fetchAccounts = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getState().accounts);
      }, 100);
    });
  };
};

export const updateBase = (base) => {
  return (dispatch) => {
    dispatch(newBase(base));
  };
};
export const ExchangeMoney = (amount, fromCurrency, toCurrency) => {
  return (dispatch, getState) => {
    const account = getState().accounts;
    return new Promise((resolve) => {
      dispatch(requestExchange());
      setTimeout(() => {
        const updateAccount = {
          ...account,
          [fromCurrency]: account[fromCurrency] - amount,
          [toCurrency]: account[toCurrency] + amount,
        };
        resolve(dispatch(recieveExchange(updateAccount)));
      }, 100);
    });
  };
};
export const fetchRates = () => {
  return async (dispatch, getState) => {
    let base = getState().base || "GBP";
    dispatch(requestRates());
    let url = `https://api.exchangeratesapi.io/latest?base=${base}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      data.timestamp = new Date().getTime();
      dispatch(recieveRates(data));
    } catch (e) {
      console.log(e);
    }
  };
};
