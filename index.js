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
            const calcButton = document.createElement("div");
            calcButton.classList.add("calcButton");
            calcButton.style.flex = "1 0 auto";
            row.appendChild(calcButton);

            const buttonText = document.createElement("span");
            buttonText.textContent = i*3+j+1;
            buttonText.classList.add("numeral");
            calcButton.appendChild(buttonText);
        }
    }
}

function renderZero(){
    const calcButton = document.createElement("div");
    calcButton.classList.add("calcButton");
    calcButton.style.flex = "2 0 auto";
    // calcButton.style.aspectRatio = "2/1";
    left.appendChild(calcButton);

    const buttonText = document.createElement("span");
    buttonText.textContent = 0;
    buttonText.classList.add("numeral");
    calcButton.appendChild(buttonText);
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

