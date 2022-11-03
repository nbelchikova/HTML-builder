const path = require('path');
const fs = require('fs');
const readline = require('readline');
const text = path.join(__dirname, ".", "input.txt");
const stream = fs.createWriteStream(text);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const { stdin, stdout } = process;
console.log('Hello! Write something:');
rl.on('line', (data) => {
  if (data === 'exit') {
    process.exit();
  }else  {
    stream.write(data + '\n');
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('The end'));