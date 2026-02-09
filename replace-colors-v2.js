const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Color replacements: royal-blue -> silver (for highlights and accents)
const replacements = [
    // Text colors
    { from: /text-leadq-royal-blue/g, to: 'text-leadq-silver' },

    // Background colors - solid backgrounds become gradient-based
    { from: /bg-leadq-royal-blue(?!\/)/g, to: 'bg-leadq-silver' },
    { from: /bg-leadq-royal-blue\/(\d+)/g, to: (match, num) => `bg-leadq-silver/${num}` },

    // Border colors
    { from: /border-leadq-royal-blue/g, to: 'border-leadq-silver' },

    // Gradients from/to
    { from: /from-leadq-royal-blue/g, to: 'from-leadq-silver' },
    { from: /to-leadq-royal-blue/g, to: 'to-leadq-silver' },

    // RGB values for blue (59, 130, 246) -> silver (192, 192, 192)
    { from: /rgba\(59,\s*130,\s*246/g, to: 'rgba(192, 192, 192' },
    { from: /rgba\(37,\s*99,\s*235/g, to: 'rgba(192, 192, 192' },
    { from: /rgb\(59,\s*130,\s*246\)/g, to: 'rgb(192, 192, 192)' },
    { from: /rgb\(37,\s*99,\s*235\)/g, to: 'rgb(192, 192, 192)' },

    // Quoted color strings
    { from: /'59, 130, 246'/g, to: "'192, 192, 192'" },
    { from: /'37, 99, 235'/g, to: "'192, 192, 192'" },
];

function processFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.tsx', '.ts', '.jsx', '.js', '.css'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else {
            processFile(filePath);
        }
    }
}

console.log('Replacing blue colors with silver...');
walkDir(srcDir);
console.log('Done!');
