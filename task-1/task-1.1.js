const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const reverse = input => {
  return input.split('').reverse().join('');
};

const output = line => {
  rl.output.write(reverse(line)+'\n\n');
};

rl.on('line', output);