import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currency-service';
import { convertCurrency } from './convert';

function formatter(inputString) {
  let newStringArray = inputString.slice(inputString.search(/[A-Z]/), inputString.length).split('');
  let newString = '';
  newStringArray.forEach((letter) => {
    if (letter.search(/[A-Z]/) > -1) {
      newString += ` ${letter}`;
    } else {
      newString += `${letter}`;
    }
  });
  return `${newString.slice(1)}s`;
}

function displayExchange(exchange) {
  const amount = $('#amount').val();
  const inputName = formatter($('#convertFrom').children(':selected').attr('id'));
  const outputName = formatter($('#convertTo').children(':selected').attr('id'));
  $('#output').html(`<p>${amount} ${inputName} is worth ${exchange} ${outputName}`);
}

function displayError() {
  $("#output").html(`<p>That currency does not exist!</p>`);
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
      if (convertCurrency) {
        displayExchange(exchange);
      } else {
        displayError();
      }
    })();
  });
});