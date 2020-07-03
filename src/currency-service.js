export class CurrencyService {
  constructor() {
    this.currencyExchange;
  }

  async currencyInitialize() {
    this.currencyExchange = await this.currencyExchangeRate();
  }

  async currencyExchangeRate() {
    try {
      let currencyResponse = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      if (!currencyResponse.ok) {
        throw Error(`${currencyResponse.status}: ${currencyResponse.statusText}`);
      }
      const currencyJSON = await currencyResponse.json();
      const currencyArray = currencyJSON["conversion_rates"];
      return currencyArray;
    } catch(error) {
      return 'Error retrieving conversion rates';
    }
  }

  currencyGet(code) {
    return this.currencyExchange[code];
  }
}