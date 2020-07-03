import $ from 'jQuery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { CurrencyService } from './currency-service';
import { convertCurrency } from './convert';

function formatter(inputString) {
  const newStringArray = inputString.slice(inputString.search(/[A-Z]/), inputString.length).split('');
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
  $('#output').show();
  $('#output').html(`<p>${amount} ${inputName} is worth ${exchange} ${outputName}</p>`);
}

function displayError(message) {
  $('#output').show();
  $("#output").html(`<p>${message}</p>`);
}

function gatherUserInput() {
  const amount = parseInt($("#amount").val());
  if (!amount) {
    return [null, null, null];
  }
  const convertFrom = $('#convertFrom').val();
  const convertTo = $('#convertTo').val();
  return [amount, convertFrom, convertTo];
}

$(document).ready(function() {
  let currencyService = new CurrencyService();

  $('form').submit(function(event) {
    event.preventDefault();
    (async ()=>{
      try {
        const [amount, convertFrom, convertTo] = gatherUserInput();
        if (!amount) {
          throw Error('Please enter an amount to be converted');
        }
        if (!currencyService.currencyExchange || currencyService.currencyExchange === 'Error retrieving conversion rates') {
          await currencyService.currencyInitialize();
        }
        if (currencyService.currencyExchange === 'Error retrieving conversion rates') {
          throw Error('Error retrieving conversion rates');
        }
        const exchange = convertCurrency(amount, convertFrom, convertTo, currencyService);
        if (convertCurrency) {
          displayExchange(exchange);
        } else {
          throw Error('That currency does not exist!');
        }
      } catch(error) {
        displayError(error.message);
      }
    })();
  });
});