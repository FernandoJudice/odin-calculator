let firstValue;
let operator;
let secondValue;

function operate(operator,firstValue,secondValue){
    return operator(firstValue,secondValue);
}

function add(a,b){
    return a+b
}

function subtract(a,b){
    return a-b
}

function multiple(a,b){
    return a*b
}

function divide(num,den){
    if (den === 0) {
        return "ERROR - Cannot divide by zero"
    }
    return num/den
}

