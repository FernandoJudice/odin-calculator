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
                    createButton(row,'+',resolveOperation);
                    break;
                case 1:
                    createButton(row,'-',resolveOperation);
                    break;
                case 2:
                    createButton(row,'*',resolveOperation);
                    break;
            }
        } else if (i === 3) {
            createButton(row,'C', clearAll);
            const calcButton = createButton(row,0, loadBuffer);
            // calcButton.style.flex = "2 0 auto";
            // calcButton.style.margin = "8px 16px";
            createButton(row,'.',addDecimal);
            createButton(row,'/',resolveOperation);
        } else {
            createButton(row,`=`,resolveOperation);
        }
    }
}

function clearAll() {
    buffer = null;
    accumulator = null;
    operator = null;
    display.textContent = "";
}

function addDecimal() {
    if(buffer.includes('.'))
        return
    if(buffer){
        buffer += '.';
        display.textContent = buffer;
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

function resolveOperation(selection){
    operate();
    selectOperation(selection);
}

function selectOperation(selection){
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
        case '=':
            operator = null;
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

function operate(){
    if(!buffer)
        return
    if(!accumulator){
        accumulator = Number(buffer);
    } else if (operator){
        accumulator = operator(Number(accumulator),Number(buffer));
    }
    display.textContent = accumulator;
    buffer = null;
    operator = null;
    return accumulator;
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

