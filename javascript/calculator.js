const minus = "-";

const operandButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const screenContent = document
  .querySelector("#calculator-screen")
  .querySelector("p");
const deleteButton = document.querySelector("#del-button");
const resetButton = document.querySelector("#reset-button");
const equalsButton = document.querySelector("#equals-button");

class Calculator {
  constructor(currentScreenTextElement) {
    this.currentScreenTextElement = currentScreenTextElement;
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
  }

  reset() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
  }

  delete() {
    // delete operator if current operand is already deleted
    if (!this.currentOperand && this.operator) {
      this.operator = "";
      return;
    }

    // delete previous operand is operator is already deleted
    if (this.previousOperand && !this.operator) {
      this.previousOperand = "";
      return;
    }

    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  updateCurrentOperand(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }

  updateOperator(operator) {
    if (operator === minus) {
      if (!this.currentOperand) {
        this.currentOperand = minus;
        return;
      }
    }
    if (!this.currentOperand) {
      return;
    }
    if (this.previousOperand) {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operator) {
      case "+":
        computation = previous + current;
        break;

      case "-":
        computation = previous - current;
        break;

      case "×":
        computation = previous * current;
        break;

      case "/":
        computation = previous / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.previousOperand = "";
    this.operator = "";
  }

  updateDisplay() {
    this.currentScreenTextElement.innerText =
      this.previousOperand + this.operator + this.currentOperand;
  }
}

const calculator = new Calculator(screenContent);

operandButtons.forEach((operandButton) => {
  operandButton.addEventListener("click", (e) => {
    e.preventDefault();
    calculator.updateCurrentOperand(e.target.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    e.preventDefault();
    calculator.updateOperator(e.target.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculator.reset();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculator.compute();
  calculator.updateDisplay();
});
