const fs = require('fs');
const file = 'src/lib/data.ts';
let code = fs.readFileSync(file, 'utf8');

const imgList = [
    'https://images.unsplash.com/photo-1544603681-4f1146747d79?w=800&q=80',
    'https://images.unsplash.com/photo-1588320490510-72412e697479?w=800&q=80',
    'https://images.unsplash.com/photo-1568218685-6184ff7ba6ae?w=800&q=80',
    'https://images.unsplash.com/photo-1510665724063-f77a01074aa2?w=800&q=80',
    'https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?w=800&q=80',
    'https://images.unsplash.com/photo-1598254885827-020ab56fb157?w=800&q=80',
    'https://images.unsplash.com/photo-1590050752117-08e82ef6fe65?w=800&q=80',
    'https://images.unsplash.com/photo-1608688404323-2895f32a4e8d?w=800&q=80',
    'https://images.unsplash.com/photo-1620613204899-23fba8e1c667?w=800&q=80',
    'https://images.unsplash.com/photo-1508244952044-67ad62095f9d?w=800&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', 
    'https://images.unsplash.com/photo-1593693397690-362cb9666c6b?w=800&q=80', 
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', 
    'https://images.unsplash.com/photo-1542454526-218baafbe51b?w=800&q=80', 
    'https://images.unsplash.com/photo-1513346940221-6f673d962e97?w=800&q=80',
    'https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=800&q=80',
    'https://images.unsplash.com/photo-1584988581514-46aeace99a19?w=800&q=80',
    'https://images.unsplash.com/photo-1625624467007-bb56117bd685?w=800&q=80', 
    'https://images.unsplash.com/photo-1616853240409-5d259cbee7ba?w=800&q=80',
    'https://images.unsplash.com/photo-1596707321689-53e7d56e29ac?w=800&q=80'
];

const regex = /export const destinations = \[\s*([\s\S]*?)\s*\];\s*export const packages/m;
const match = code.match(regex);

if (match) {
    let raw = match[1];
    let dests = raw.split(/(?=\n\s*\{\s*\n\s*id:)/g);
    
    let counter = 0;
    for (let i = 0; i < dests.length; i++) {
        const dest = dests[i];
        if (dest.includes("id: 'rameshwaram'") || dest.includes("id: 'madurai'") || dest.includes("id: 'tirupati'") || dest.includes("id: 'kanyakumari'")) {
            continue; // keep original
        }
        
        if (dest.includes("id: 'hyderabad'")) {
             dests[i] = dest.replace(/image: '.*?'/, "image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80'"); 
             // Actually wait, let's use Charminar for hyderabad
             dests[i] = dest.replace(/image: '.*?'/, "image: 'https://images.unsplash.com/photo-1620025983802-1815db976865?w=800&q=80'");
             continue;
        }

        dests[i] = dest.replace(/image: '.*?'/, "image: '" + imgList[counter % imgList.length] + "'");
        counter++;
    }

    code = code.replace(regex, "export const destinations = [\n" + dests.join("") + "\n];\n\nexport const packages");
    fs.writeFileSync(file, code);
    console.log("Images have been fully updated!");
} else {
    console.log("Parse failed.");
}
