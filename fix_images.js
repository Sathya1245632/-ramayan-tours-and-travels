const fs = require('fs');
const file = 'src/lib/data.ts';
let code = fs.readFileSync(file, 'utf8');

const validLocalImages = [
    '/images/kanyakumari.jpg',
    '/images/madurai.jpg',
    '/images/rameshwaram-hero.jpg',
    '/images/tirupati.jpg'
];

const regex = /export const destinations = \[\s*([\s\S]*?)\s*\];\s*export const packages/m;
const match = code.match(regex);

if (match) {
    let raw = match[1];
    let dests = raw.split(/(?=\n\s*\{\s*\n\s*id:)/g);
    
    let counter = 0;
    for (let i = 0; i < dests.length; i++) {
        const dest = dests[i];
        if (dest.includes("id: 'rameshwaram'") || dest.includes("id: 'madurai'") || dest.includes("id: 'tirupati'") || dest.includes("id: 'kanyakumari'") || dest.includes("id: 'hyderabad'")) {
            continue; // Keep these as they are (original local ones + my custom hyderabad local one)
        }
        
        // Any remaining unsplash URLs get replaced with a valid local one
        dests[i] = dest.replace(/image: 'https:\/\/images\.unsplash\.com[^']*'/, "image: '" + validLocalImages[counter % validLocalImages.length] + "'");
        counter++;
    }

    code = code.replace(regex, "export const destinations = [\n" + dests.join("") + "\n];\n\nexport const packages");
    fs.writeFileSync(file, code);
    console.log("Replaced broken Unsplash URLs with valid local images!");
} else {
    console.log("Parse failed.");
}
