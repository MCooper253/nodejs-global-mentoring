const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const reverse = input => {
  const length = input.length;
  let revString = '';
  for (let i=length-1; i>=0; i=i-1) {
    revString = revString + input[i];
  };
  rl.output.write(revString)
}

rl.on('line', function(line){
  reverse(line);
});