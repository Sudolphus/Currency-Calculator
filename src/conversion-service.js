export class ConversionService {
  convertFromUSD(amount, exchangeRate) {
    return amount*exchangeRate;
  }

  convertToUSD(amount, exchangeRate) {
    return amount/exchangeRate;
  }
}