const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => b === 0 ? "Error" : a / b
};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      display.textContent = "0";
    } 
    else if (value === "←") {
      display.textContent = display.textContent.slice(0, -1) || "0";
    } 
    else if (value === "=") {
      try {
        const expr = display.textContent.replace(/÷/g, "/").replace(/×/g, "*");
        const match = expr.match(/(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)/);
        if (match) {
          const a = parseFloat(match[1]);
          const op = match[2];
          const b = parseFloat(match[3]);
          display.textContent = ops[op](a, b);
        }
      } catch {
        display.textContent = "Error";
      }
    } 
    else {
      if (display.textContent === "0" || display.textContent === "Error") {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
    }
  });
});
