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

export function displayExchange(exchange) {
  const amount = parseInt($('#amount').val()).toFixed(2);
  const inputName = formatter($('#convertFrom').children(':selected').attr('id'));
  const outputName = formatter($('#convertTo').children(':selected').attr('id'));
  $('#output').show();
  $('#output').html(`<p>${amount} ${inputName} is worth ${exchange} ${outputName}</p>`);
}

export function displayError(message) {
  $('#output').show();
  $("#output").html(`<p>${message}</p>`);
}