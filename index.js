let accumulator;
let operator;
let buffer;

const left = document.querySelector(".left");

renderOneToNine();
renderZero();

function renderOneToNine(){
    for (let i=0; i<3; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        left.appendChild(row);

        for (let j=0;j<3;j++) {
            createButton(row,i*3+j+1)
        }
    }
}

function renderZero(){
    const calcButton = createButton(left,0);
    calcButton.style.flex = "2 0 auto";
}

function createButton(parent,contentText,contentCallback){
    const calcButton = document.createElement("div");
    calcButton.classList.add("calcButton");
    calcButton.style.flex = "1 0 auto";
    parent.appendChild(calcButton);

    const buttonText = document.createElement("span");
    buttonText.textContent = contentText;
    buttonText.classList.add("numeral");
    calcButton.appendChild(buttonText);

    return calcButton
}

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

