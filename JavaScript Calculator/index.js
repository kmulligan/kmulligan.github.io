$(document).ready(function() {
  var displayValue = "0";
  var userInputFirst;
  var userInputNext;
  var userInputArr = [];
  var inputHistoryValue;
  var show;
  var result;
  var buttonText;

  var display;

  var userOperator;

  var userClick = "0";

  function leadingZeroDelete(number) {
    for (var i = 0; i < number.length; i++) {
      if ((number.charAt(0) == "0") && (number.length > 1)) { //leaves us with just 0 if multiple 0s are entered, e.g. 00000 --> 0; otherwise removes all leading zeros.
        //console.log("userClick has been sliced from: " + userClick);
        number = number.slice(1);
        i = 0;
        //console.log("userClick has been sliced to: " + userClick);
      }
    }
    console.log("leadingZeroDelete did some slicing: " + number);
    return number;
  }

  function inputHistory(clicked) {
    $('#inputHistory').append(clicked.text());
  }

  $('#display').append(displayValue);
  $('.calc-button').click(function() {
    inputHistory($(this));
    $('#userInput').append($(this).text());
    userClick = $('#userInput').text();
  })
  $('.op-button').click(function() {
    $('#inputHistory').append($(this).text());
    $('#userInput').append($(this).text());
  })

  $('#opEqual').click(function() {
    result = eval($('#inputHistory').text());
    result = (result.toFixed(10));
    for (var y = 0; y < result.length; y++) {
      if (result.charAt(result.length - 1) == "0") {
        result = result.slice(0, result.length - 1);
        y = 0;
      } else if (result.charAt(result.length - 1) == ".") {
        result = result.slice(0, result.length - 1);
      }
    }
    $('#display').text(result);
  })

  //clears out input
  function calcClear() {
    $('#inputHistory').empty();
    userClick = "";
  }

  $('#calcClear').click(function() {
    calcClear();
  })

  //Clear everything and start over
  $('#calcAllClear').click(function() {
    $('#display').text("0");
    $('#inputHistory').empty();
    calcClear();
    displayValue = 0;
    userClick = "0";
  })

});
