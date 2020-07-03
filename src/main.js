import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currency-service';

$(document).ready(function() {
  let currencyService = new CurrencyService();

  $('form').submit(function(event) {
    event.preventDefault();
    const convertFrom = $('#convertFrom').val();
    const convertTo = $('#convertTo').val();
    (async ()=>{
      if (!currencyService.currencyExchange) {
        await currencyService.currencyInitialize();
      }

    })();
  });
});