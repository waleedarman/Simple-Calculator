'use strict';

const display = document.getElementById('display');
const grid = document.querySelector('.calc-grid');

const OPS = {
  add:      (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide:   (a, b) => (b === 0 ? 'undefined' : a / b),
};

let prev = null;
let cur  = '0';
let op   = null;
let overwrite = true;

const setDisplay = (v) => (display.textContent = String(v));
const asNum = (s) => Number(s);
const fmt = (v) => (String(v).length > 14 ? Number(v).toExponential(8) : String(v));

const inputDigit = (d) => {
  if (overwrite) { cur = d; overwrite = false; }
  else { cur = (cur === '0' ? d : cur + d); }
  setDisplay(cur);
};

const inputDot = () => {
  if (overwrite) { cur = '0.'; overwrite = false; }
  else if (!cur.includes('.')) cur += '.';
  setDisplay(cur);
};

const chooseOp = (nextOp) => {
  if (op && !overwrite && prev !== null) {
    const a = prev, b = asNum(cur);
    const result = OPS[op](a, b);
    prev = (result === 'undefined' ? null : Number(result));
    cur = fmt(result);
    setDisplay(cur);
  } else {
    prev = asNum(cur);
  }
  op = nextOp;
  overwrite = true;
};

const equals = () => {
  if (op == null || prev == null) return;
  const result = OPS[op](prev, asNum(cur));
  cur = fmt(result);
  prev = null; op = null; overwrite = true;
  setDisplay(cur);
};

const clearAll = () => {
  prev = null; cur = '0'; op = null; overwrite = true;
  setDisplay(cur);
};

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.calc-btn');
  if (!btn) return;

  if (btn.dataset.num !== undefined) return inputDigit(btn.dataset.num);
  if (btn.dataset.op)                 return chooseOp(btn.dataset.op);

  const act = btn.dataset.action;
  if (act === 'dot')    return inputDot();
  if (act === 'equals') return equals();
  if (act === 'clear')  return clearAll();
});

setDisplay(cur);
