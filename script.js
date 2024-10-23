const display = document.getElementById('result');
const buttons = document.querySelectorAll('.number, .operator');
const scientificButtons = document.querySelectorAll('.scientific');
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

scientificButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operation = button.textContent;
    const value = parseFloat(display.value);

    switch (operation) {
      case 'sin':
        display.value = Math.sin(value);
        break;
      case 'cos':
        display.value = Math.cos(value);
        break;
      case 'tan':
        display.value = Math.tan(value);
        break;
      case 'log':
        display.value = Math.log(value);
        break;
      default:
        display.value = 'Error';
    }
  });
});
