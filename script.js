let display = document.getElementById('display');
let expression = '';

function appendCharacter(character) {
  expression += character;
  display.value = expression;
}

function clearDisplay() {
  expression = '';
  display.value = '';
}

function deleteLastCharacter() {
  expression = expression.slice(0, -1);
  display.value = expression;
}

function calculateResult() {
  try {
    let result = eval(expression);
    expression = result.toString();
    display.value = expression;
  } catch (error) {
    display.value = 'Error';
  }
}
