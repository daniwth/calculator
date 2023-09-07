const display = document.getElementById('result');
const buttons = document.querySelectorAll('.number, .operator');
const clearButton = document.querySelector('.clear');
const resetButton = document.querySelector('.reset');
const equalButton = document.querySelector('.equal');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    display.value += button.textContent;
  });
});

clearButton.addEventListener('click', () => {
  display.value = display.value.slice(0, -1);
});

resetButton.addEventListener('click', () => {
  display.value = '';
});

equalButton.addEventListener('click', () => {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
});
