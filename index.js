let accumulator;
let operator;
let buffer;

const left = document.querySelector(".left");
const display = document.querySelector(".display");

renderKeyboard();

function renderKeyboard(){
    for (let i=0; i<5; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        left.appendChild(row);

        if (i<3){
            for (let j=0;j<3;j++) {
                createButton(row,i*3+j+1,loadBuffer)
            }
            switch(i){
                case 0:
                    createButton(row,'+',selectOperation);
                    break;
                case 1:
                    createButton(row,'-',selectOperation);
                    break;
                case 2:
                    createButton(row,'*',selectOperation);
                    break;
            }
        } else if (i === 3) {
            const calcButton = createButton(row,0, loadBuffer);
            calcButton.style.flex = "2 0 auto";
            calcButton.style.margin = "8px 16px";
            createButton(row,'.');
            createButton(row,'/',selectOperation);
        } else {
            createButton(row,`=`,selectOperation);
        }
    }
}

function loadBuffer(value){
    if (!isNaN(Number(value))) {
        if (!buffer) {
            display.textContent = "";
            buffer = "";
        } 
        buffer += value;
        display.textContent = buffer;
    }
}

function selectOperation(selection){
    if(accumulator){
        accumulator = operate(operator,Number(accumulator),Number(buffer));
        buffer = null;
        display.textContent = accumulator;
    } else {
        accumulator = buffer;
        buffer = null
    }
    switch(selection){
        case '+':
            operator = add;
            break;
        case '-':
            operator = subtract;
            break;
        case '*':
            operator = multiply;
            break;
        case '/':
            operator = divide;
            break;
        default:
            display.textContent = "Error - invalid operation";
            break;
    }
}

function createButton(parent,contentText,contentCallback){
    const calcButton = document.createElement("button");
    calcButton.classList.add("calcButton");
    calcButton.style.flex = "1 0 auto";
    calcButton.onclick = (e) => contentCallback(e.target.textContent);
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

function multiply(a,b){
    return a*b
}

function divide(num,den){
    if (den === 0) {
        return "ERROR - Cannot divide by zero"
    }
    return num/den
}

