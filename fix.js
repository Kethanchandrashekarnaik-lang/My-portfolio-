const fs = require('fs');
let lines = fs.readFileSync('assets/js/main.js', 'utf8').split('\n');
lines.splice(829, 1023 - 830 + 1);

// Remove the extra '}' I added at the end earlier
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '}') {
        lines.splice(i, 1);
        break;
    }
}

fs.writeFileSync('assets/js/main.js', lines.join('\n'));
console.log('Fixed main.js');
