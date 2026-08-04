const fs = require('fs');
const text = fs.readFileSync('assets/js/main.js', 'utf8');
let stack = [];
for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') stack.push(text.substring(0, i).split('\n').length);
    else if (text[i] === '}') {
        if (stack.length) stack.pop();
        else console.log('Extra } at line ' + text.substring(0, i).split('\n').length);
    }
}
for (let line of stack) {
    console.log('Unclosed { at line ' + line);
}
