let accumulator;
let operator;
let buffer = "";
let displaySize = 4;

const left = document.querySelector(".left");
const display = document.querySelector(".display");

renderKeyboard();

document.addEventListener('keydown', (event) => onKeyboardPress(event.key));

function renderKeyboard(){
    for (let i=0; i<6; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        left.appendChild(row);

        if (i === 0) {
            createButton(row,'Display size', () => resizeDisplay(prompt()));
            createButton(row,'C', clearAll);
            createButton(row,'<=', clearLastNumber);
            
        } else if (i<4){
            for (let j=0;j<3;j++) {
                createButton(row,(i-1)*3+j+1,loadBuffer)
            }
            switch(i){
                case 1:
                    createButton(row,'+',resolveOperation);
                    break;
                case 2:
                    createButton(row,'-',resolveOperation);
                    break;
                case 3:
                    createButton(row,'*',resolveOperation);
                    break;
            }
        } else if (i === 4) {
            const calcButton = createButton(row,0, loadBuffer);
            calcButton.style.flex = "2 0 auto";
            calcButton.style.padding = "1em 12px";
            createButton(row,'.',addDecimal);
            createButton(row,'/',resolveOperation);
        } else {
            createButton(row,`=`,resolveOperation);
        }
    }
}

function onKeyboardPress(key){
    if(Number(key))
        loadBuffer(key);
    if(key === `.`){
        addDecimal();
    }
    if(key === 'Backspace' || key === 'Delete'){
        clearLastNumber();
    }
    if(key === 'Enter' || key === '='){
        resolveOperation('=');
    }
    if('+-*/'.includes(key)){
        resolveOperation(key);
    }
}

function clearAll() {
    buffer = "";
    accumulator = null;
    operator = null;
    renderDisplay("");
}

function addDecimal() {
    if(buffer.includes('.'))
        return
    if(buffer){
        buffer += '.';
        renderDisplay(buffer);
    }
}

function clearLastNumber(){
    if (buffer) {
        buffer = buffer.slice(0,-1);
        renderDisplay(buffer);
    } else {
        clearAll()
    }
}

function resizeDisplay(value) {
    if(Number(value)){
        displaySize = Math.round(Number(value));
        displaySize = Math.max(displaySize,4);
        displaySize = Math.min(displaySize,16);
    } else {
        alert("Please, insert a number between 4 and 16");
    }
}

function renderDisplay(value){
    let compactValue = value;
    console.log(value);
    
    if(Number(value)) {
        const parts = value.split('.');

        if (parts[0].length > displaySize) {
            let exp = parts[0].length - displaySize + 1;
            compactValue = String(Math.round(Number(value)/(10**(exp+1)))); // exp + 1 to account for the E symbol in exponent
            compactValue += 'E'
            compactValue += exp;
        } else if (value.length > displaySize) {
            let decimalSize = displaySize - parts[0].length - 1;
            compactValue = String(Number(value).toFixed(decimalSize));
        }
    }

    display.textContent = compactValue;
}

function loadBuffer(value){
    if(buffer.length >= displaySize)
        return

    if (!isNaN(Number(value))) {
        if (!buffer) {
            display.textContent = "";
            buffer = "";
        } 
        buffer += value;
        renderDisplay(buffer);
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
            renderDisplay("Error - invalid operation");
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
    renderDisplay(String(accumulator));
    buffer = "";
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

