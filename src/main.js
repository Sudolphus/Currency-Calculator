import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currencyService';

$(document).ready(function() {
  let currencyService = new CurrencyService();
  (async ()=>{
    await currencyService.currencyInitialize();
    // eslint-disable-next-line no-console
    console.log(currencyService.currencyExchange);
    alert(currencyService.currencyGet('AED'));
  })();
});