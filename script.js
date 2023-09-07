// Variables
let operationInput = document.getElementById('operation');
let resultInput = document.getElementById('result');
let clearEntryButton = document.getElementById('clear-entry');
let clearAllButton = document.getElementById('clear-all');
let equalsButton = document.getElementById('equals');
let numberButtons = document.getElementsByClassName('number');
let operatorButtons = document.getElementsByClassName('operator');

// Event Listeners
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        appendNumber(numberButtons[i].textContent);
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
        appendOperator(operatorButtons[i].textContent);
    });
}

clearEntryButton.addEventListener('click', clearEntry);
clearAllButton.addEventListener('click', clearAll);
equalsButton.addEventListener('click', calculate);

// Functions
function appendNumber(number) {
    operationInput.value += number;
}

function appendOperator(operator) {
    operationInput.value += operator;
}

function clearEntry() {
    operationInput.value = operationInput.value.slice(0, -1);
}

function clearAll() {
    operationInput.value = '';
    resultInput.value = '';
}

function calculate() {
    let operation = operationInput.value;
    let result = eval(operation);
    resultInput.value = result;
}
