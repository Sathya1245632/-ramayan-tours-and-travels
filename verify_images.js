const tsFile = require('fs').readFileSync('src/lib/data.ts', 'utf8');
const destinationsObj = tsFile.match(/export const destinations = \[\s*([\s\S]*?)\s*\];\s*export const packages/m);
if (destinationsObj) {
  const allImages = destinationsObj[1].match(/image: '(.*)'/g);
  console.log(allImages);
}
