/* eslint-disable no-undef */
import { CurrencyService } from './../src/currencyService';

describe('Currency Service', ()=>{
  let currency = new CurrencyService();

  test('should get the currency exchange rates', ()=>{
    jest.setTimeout(60000);
    expect(currency).toBeDefined();
    // eslint-disable-next-line no-console
    console.log(currency.currencyExchange);
    expect(currency.currencyExchange).toBeDefined();
  });
});