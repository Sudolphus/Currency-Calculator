import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currencyService';

$(document).ready(function() {
  $("#getRates").click(function() {
    let currencyService = new CurrencyService();
    (async ()=>{
      currencyService.currencyExchange = await currencyService.currencyInitialize();
      // eslint-disable-next-line no-console
      console.log(currencyService.currencyExchange);
    })();
  });
});