const buttons = document.querySelector(".calculator-buttons");
const display = document.querySelector(".calculator-result");
const comma = document.querySelector("#sign");

let stringNumber, actualNumber, storedNumber, storedOperator, result;

function clear() {
  actualNumber = 0;
  storedNumber = 0;
  storedOperator = "";
  result = 0;
  stringNumber = actualNumber;
  display.innerText = actualNumber;
  comma.disabled = false;
}
clear();

function clearEntry() {
  actualNumber = storedNumber;
  display.innerText = actualNumber;
  stringNumber = "";
  comma.disabled = false;
}

function equation(action, a, b) {
  switch (action) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b !== 0) {
        result = a / b;
      } else {
        return alert("You can not divide by 0!");
      }
      break;
  }
}

function number(e) {
  if (stringNumber === 0) {
    stringNumber = "";
  }
  stringNumber += e;
  actualNumber = parseFloat(stringNumber.replace(comma.innerText, "."));
  display.innerText = stringNumber;
}

function operator(e) {
  if (storedOperator !== "") {
    equation(storedOperator, storedNumber, actualNumber);
    actualNumber = result;
  }
  if (stringNumber === "") {
    stringNumber = storedNumber;
  }
  storedNumber = actualNumber;
  storedOperator = e;
  stringNumber = "";
  comma.disabled = false;
}

function equal() {
  equation(storedOperator, storedNumber, actualNumber);
  actualNumber = storedNumber = result;
  storedOperator = "";
  stringNumber = actualNumber;
  if (comma.innerText === ".") {
    display.innerText = actualNumber;
  } else {
    display.innerText = actualNumber.toString().replace(".", comma.innerText);
  }
}

function sign() {
  stringNumber = display.innerText;
  stringNumber += comma.innerText;
  display.innerText = stringNumber;
  comma.disabled = true;
}

buttons.addEventListener("click", e => {
  if (e.target.className.includes("number")) {
    number(e.target.innerText);
  } else if (e.target.className.includes("operator")) {
    operator(e.target.innerText);
  } else if (e.target.id === "equal") {
    equal();
  } else if (e.target.id === "clear") {
    clear();
  } else if (e.target.id === "clear-entry") {
    clearEntry();
  } else if (e.target.id === "sign") {
    sign();
  }
});
