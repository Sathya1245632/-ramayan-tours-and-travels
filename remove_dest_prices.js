const fs = require('fs');

const file = 'src/lib/data.ts';
let code = fs.readFileSync(file, 'utf8');

// The `destinations` array is defined up to `packages`.
const regex = /export const destinations = \[\s*([\s\S]*?)\s*\];\s*export const packages =/m;
const match = code.match(regex);

if (match) {
    let destinationsBlock = match[1];
    destinationsBlock = destinationsBlock.replace(/^\s*price:\s*\d+,\s*$/gm, '');
    code = code.replace(regex, `export const destinations = [\n${destinationsBlock}\n];\n\nexport const packages =`);
    fs.writeFileSync(file, code);
    console.log("Successfully removed prices from destinations.");
} else {
    console.log("Could not find destinations array.");
}
