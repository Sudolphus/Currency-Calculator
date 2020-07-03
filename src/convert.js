import { ConversionService } from "./conversion-service";

export function convertCurrency(amount, convertFrom, convertTo, currencyService) {
  let convertService = new ConversionService();
  const normalizeRate = currencyService.currencyGet(convertFrom);
  const exchangeRate = currencyService.currencyGet(convertTo);
  if (!normalizeRate || !exchangeRate) {
    return false;
  }
  const normalizeIncoming = convertService.convertToUSD(amount, normalizeRate);
  const convertOutgoing = convertService.convertFromUSD(normalizeIncoming, exchangeRate);
  return convertOutgoing.toFixed(2);
}