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
  const amount = parseInt($('#amount').val()).toFixed(2);
  const inputName = formatter($('#convertFrom').children(':selected').attr('id'));
  const outputName = formatter($('#convertTo').children(':selected').attr('id'));
  $('#output').html(`<p>${amount} ${inputName} is worth ${exchange} ${outputName}</p>`);
}

function displayError(message) {
  $("#output").html(`<p>${message}</p>`);
}

$(document).ready(function() {
  let currencyService = new CurrencyService();

  $('form').submit(function(event) {
    event.preventDefault();
    const amount = parseInt($("#amount").val());
    if (!amount) {
      displayError('Please select an amount to be converted');
      return;
    }
    const convertFrom = $('#convertFrom').val();
    const convertTo = $('#convertTo').val();
    let exchange;
    (async ()=>{
      if (!currencyService.currencyExchange || currencyService.currencyExchange === 'Error retrieving conversion rates') {
        await currencyService.currencyInitialize();
      }
      if (currencyService.currencyExchange === 'Error retrieving conversion rates') {
        displayError('Error retrieving conversion rates');
        return;
      }
      exchange = convertCurrency(amount, convertFrom, convertTo, currencyService);
      $('#output').show();
      if (convertCurrency) {
        displayExchange(exchange);
      } else {
        displayError('That currency does not exist!');
      }
    })();
  });
});