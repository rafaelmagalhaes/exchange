import {
  RECIEVE_EXCHANGE,
  REQUEST_EXCHANGE,
  RECIEVE_RATES,
  REQUEST_RATES,
  UPDATE_BASE,
} from "./actions";

const exchange = (
  state = {
    isFetching: false,
    exchanges: {},
    accounts: { EUR: 50, USD: 50, GBP: 60 },
  },
  action
) => {
  switch (action.type) {
    case REQUEST_RATES:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_RATES:
      return Object.assign({}, state, {
        isFetching: false,
        exchanges: action.exchanges,
      });
    case RECIEVE_EXCHANGE:
      return Object.assign({}, state, {
        accounts: action.accounts,
        isFetching: false,
      });
    case REQUEST_EXCHANGE:
      return Object.assign({}, state, { isFetching: true });
    case UPDATE_BASE:
      return Object.assign({}, state, {
        base: action.base,
      });
    default:
      return state;
  }
};

export default exchange;
