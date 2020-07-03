import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currency-service';
import { convertCurrency } from './convert';


function displayExchange(exchange) {
  $('#output').html(`<p>That's worth ${exchange}</p>`);
}

$(document).ready(function() {
  let currencyService = new CurrencyService();

  $('form').submit(function(event) {
    event.preventDefault();
    const amount = $("#amount").val();
    const convertFrom = $('#convertFrom').val();
    const convertTo = $('#convertTo').val();
    let exchange;
    (async ()=>{
      if (!currencyService.currencyExchange) {
        await currencyService.currencyInitialize();
      }
      exchange = convertCurrency(amount, convertFrom, convertTo, currencyService);
      displayExchange(exchange);
    })();
  });
});