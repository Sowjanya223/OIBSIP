const inputDisplay = document.getElementById('input');
const outputDisplay = document.getElementById('output');
const buttons = document.querySelectorAll('.btn');

let input = '';
let lastAnswer = '';

function roundToSix(num) {
  return Math.round(num * 1e6) / 1e6;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let value = button.getAttribute('data-value');

    if (value === 'C') {
      input = '';
      inputDisplay.textContent = '0';
      outputDisplay.textContent = '= 0';
    } else if (value === 'DEL') {
      input = input.slice(0, -1);
      inputDisplay.textContent = input || '0';
    } else if (value === '=') {
      try {
        let expression = input.replace(/√(\d+(\.\d+)?|\([^()]*\))/g, 'Math.sqrt($1)')
                              .replace(/x²/g, '**2')
                              .replace(/%/g, '/100');

        let result = eval(expression);
        result = roundToSix(result);
        outputDisplay.textContent = '= ' + result;
        lastAnswer = result;
        input = result.toString();
        inputDisplay.textContent = input;
      } catch {
        outputDisplay.textContent = '= Error';
        input = '';
      }
    } else if (value === 'ANS') {
      input += lastAnswer.toString();
      inputDisplay.textContent = input;
    } else if (value === '±') {
      let match = input.match(/(-?\d+\.?\d*)$/);
      if (match) {
        let num = match[0];
        let toggled = num.startsWith('-') ? num.slice(1) : '-' + num;
        input = input.slice(0, -num.length) + toggled;
        inputDisplay.textContent = input;
      }
    } else {
      input += value;
      inputDisplay.textContent = input;
    }
  });
});
