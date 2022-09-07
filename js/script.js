let panel = document.querySelector('#panel');
let cleaningMessage = document.querySelector("#cleaningMessage");
let btnCounter = document.querySelector('#counter');
let clear = document.querySelector('#clear');
let backspace = document.querySelector('#backspace');
let keys = document.querySelectorAll('.key');

//se as teclas superiores e inferiores estão em uso ou não
let upperKeysUse = false;
let bottomKeysUse = false;

//contador
let counter = 0;

//texto
let digitGetted = "";
let equation = 0;

//número de digitações (numbers e operations)
let typingNumber = 0;


//teclas inferiores

//digitação via click
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function () {

        enableBottomKeys();
        digitGetted = keys[i].textContent;
        insertInPanel();
        typingNumber++;


    });
}

//digitação via teclado


window.addEventListener("keydown", function (e) {
    enableBottomKeys();
   
    if (e.key == '1') {
        digitGetted = '1';
    }
    if (e.key == '2') {
        digitGetted = '2';
    }
    if (e.key == '3') {
        digitGetted = '3';
    }
    if (e.key == '4') {
        digitGetted = '4';
    }
    if (e.key == '5') {
        digitGetted = '5';
    }
    if (e.key == '6') {
        digitGetted = '6';
    }
    if (e.key == '7') {
        digitGetted = '7';
    }
    if (e.key == '8') {
        digitGetted = '8';
    }
    if (e.key == '9') {
        digitGetted = '9';
    }
    if (e.key == '0') {
        digitGetted = '0';
    }
    if (e.key == '+') {
        digitGetted = '+';
    }
    if (e.key == '-') {
        digitGetted = '-';
    }
    if (e.key == '*') {
        digitGetted = '*';
    }
    if (e.key == '/') {
        digitGetted = '/';
    }
    if (e.key == 'Enter') {
        digitGetted = '=';
    }
    if (e.key == 'Backspace') {
       deleteDigit();
    }

    insertInPanel();
    typingNumber++;
});

//teclas superiores


//contador click

btnCounter.addEventListener("click", function () {
    upperKeysUse = true;
    if (bottomKeysUse == true) {
        counter = 0;
        bottomKeysUse = false;
    }
    counter++;
    let texto = "";
    let vez = "vezes";

    if (counter <= 1) {
        vez = "vez";
    }
    panel.textContent = "Clicou " + counter + " " + vez;

});

//botao limpar 
clear.addEventListener("click", function () {
    upperKeysUse = true;
    clearAll();

    if (panel.textContent != "Tudo pronto") {
        panel.textContent = "Tudo pronto";
        cleaningMessage.textContent = "Limpado!";
        setTimeout(function () {
            cleaningMessage.innerHTML = "&nbsp";
        }, 2000);

    }
});

//botao de apagar um dígito
backspace.addEventListener("click", function () {
    if (bottomKeysUse == true && panel.textContent != "Tudo pronto" && panel.textContent != "") {
        deleteDigit();
    }
});



/*Funcoes*/

function enableBottomKeys() {
    bottomKeysUse = true;
    if (upperKeysUse == false && panel.textContent != "" && typingNumber == 0) {
        clearAll();
    } else if (upperKeysUse == true && panel.textContent != "") {
        upperKeysUse = false;
        clearAll();
    }
}

function insertInPanel() {
    switch (checkType(digitGetted)) {
        case 'number':
            panel.textContent += digitGetted;
            break;
        case 'operator':
            if (checkLastType() == 'operator') {
                deleteDigit();
            }
            if (typingNumber == 0 && isMultiOrDiv(digitGetted) == true) {
                panel.textContent = "Comece com + ou -";
                typingNumber = -1;
                break;
            }
            panel.textContent += digitGetted;
            break;
        case 'equal':
            if (checkLastType() == 'operator') {
                deleteDigit();
            }
            calculate();
            break;
    }
}

function calculate() {
    equation = panel.textContent;
    clearAll;
    panel.textContent = eval(equation);
}


function numberFormatBR(number) {
    internationalNumberFormat = new Intl.NumberFormat('pt-BR');
    return internationalNumberFormat.format(number);
}

function checkType(data) {
    type = "";
    if (data == '+' || data == '-' || data == '*' || data == '/') {
        type = 'operator';
    } else if (data == '=') {
        type = 'equal';
    } else {
        type = 'number';
    }
    return type;
}



function checkLastType() {
    let last = panel.textContent.trim().slice(-1);
    return checkType(last);
}

function deleteDigit() {
    let text = panel.textContent.trim();
    panel.textContent = text.slice(0, -1);
}


function isMultiOrDiv(digit) {
    if (digit == '*') {
        return true;
    } else if (digit == '/') {
        return true;
    } else {
        return false;
    }
}

//Limpador
function clearAll() {
    counter = 0;
    panel.textContent = "";
    typingNumber = 0;
}

