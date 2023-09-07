let operationInput = document.getElementById('operation');
let resultInput = document.getElementById('result');

function appendNumber(number) {
    operationInput.value += number;
}

function appendOperator(operator) {
    operationInput.value += operator;
}

function calculate() {
    let operation = operationInput.value;
    let result = eval(operation);
    resultInput.value = result;
}

function clearEntry() {
    operationInput.value = operationInput.value.slice(0, -1);
}

function clearCalculator() {
    operationInput.value = '';
    resultInput.value = '';
}
