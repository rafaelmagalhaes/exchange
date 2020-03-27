import calculateRates from "./helpers/calculateRates";
import exchange from "./store/reducer";
import currency from "./helpers/currency";
import { ExchangeMoney } from "./store/actions";

let initState = {
  isFetching: false,
  exchanges: {},
  accounts: { EUR: 50, USD: 50, GBP: 60 },
};
const fromCurrency = "GBP";
const toCurrency = "USD";
const testRates = {
  EUR: 1.5,
  USD: 1.2,
  GBP: 1.05,
};
describe("calculate exchange rates", () => {
  it("should return the correct value when given an exchange rate", () => {
    expect(calculateRates(20, testRates.USD, "exchange")).toBeCloseTo(24);
  });

  it("reversing the exchange rate, should return correct value when base is GBP, given i Enter 24 USD", () => {
    expect(calculateRates(24, testRates.USD, "reverse-exchange")).toBeCloseTo(
      20
    );
  });
});

describe("format currency value", () => {
  it("should return the correct format for given currency", () => {
    expect(currency("GBP", 20)).toBe(`£20.00`);
  });
});

describe("ExchangeCurrency", () => {
  const accounts = initState.accounts;
  const amount = calculateRates(20, testRates.USD, "exchange");
  const updateAccount = {
    ...accounts,
    [fromCurrency]: accounts[fromCurrency] - amount,
    [toCurrency]: accounts[toCurrency] + amount,
  };
  const reducer = exchange(initState, {
    type: "RECIEVE_EXCHANGE",
    accounts: updateAccount,
  });

  it("isFetching should be true when action REQUEST_EXCHANGE is called", () => {
    const reducer = exchange(initState, { type: "REQUEST_EXCHANGE" });
    expect(reducer).toEqual({
      isFetching: true,
      exchanges: {},
      accounts: { EUR: 50, USD: 50, GBP: 60 },
    });
  });
  it("should update the state with new account values and set isFetching to false when RECIEVE_EXCHANGE is called", async () => {
    expect(reducer).toEqual({
      ...reducer,
      isFetching: false,
      accounts: reducer.accounts,
    });
  });
  it("expect the correct amount in GBP account after a exchange ", async () => {
    expect(reducer.accounts.GBP).toBeCloseTo(36);
  });
  it("expect the correct amount in USD account after a exchange ", async () => {
    expect(reducer.accounts.USD).toBeCloseTo(74);
  });
});
