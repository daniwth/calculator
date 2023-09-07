// Lógica de la calculadora
const display = document.getElementById('result');
const buttons = document.querySelectorAll('.number, .operator, .equal');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('equal')) {
            calculate();
        } else {
            display.value += button.textContent;
        }
    });
});

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}
