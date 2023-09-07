let operando1 = '';
let operando2 = '';
let operador = '';
let resultado = '';

function agregarNumero(numero) {
    if (operador === '') {
        operando1 += numero;
    } else {
        operando2 += numero;
    }
    actualizarResultado();
}

function agregarOperador(op) {
    if (operando1 !== '' && operando2 !== '') {
        calcular();
    }
    operador = op;
}

function agregarDecimal() {
    if (operador === '') {
        if (!operando1.includes('.')) {
            operando1 += '.';
        }
    } else {
        if (!operando2.includes('.')) {
            operando2 += '.';
        }
    }
    actualizarResultado();
}

function calcular() {
    const num1 = parseFloat(operando1);
    const num2 = parseFloat(operando2);
    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
        default:
            break;
    }
    operando1 = resultado.toString();
    operando2 = '';
    operador = '';
    actualizarResultado();
}

function limpiar() {
    operando1 = '';
    operando2 = '';
    operador = '';
    resultado = '';
    actualizarResultado();
}

function borrar() {
    if (operador === '') {
        operando1 = operando1.slice(0, -1);
    } else {
        operando2 = operando2.slice(0, -1);
    }
    actualizarResultado();
}

function actualizarResultado() {
    document.getElementById('resultado').value = operando1 + operador + operando2;
}
