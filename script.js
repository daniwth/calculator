const display = document.getElementById('result');
const buttons = document.querySelectorAll('.number, .operator, .equal');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    display.value += button.textContent;
  });
});

document.querySelector('.equal').addEventListener('click', () => {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
});
