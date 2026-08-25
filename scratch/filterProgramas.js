const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/programasData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find start and end of PROGRAMAS_DB
const startIndex = content.indexOf('export const PROGRAMAS_DB: Record<string, Record<string, string>> = {');
if (startIndex === -1) {
    console.error("Could not find start");
    process.exit(1);
}

// Find the end of the object by counting braces
let openBraces = 0;
let endIndex = -1;
let started = false;

for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') {
        openBraces++;
        started = true;
    } else if (content[i] === '}') {
        openBraces--;
    }
    if (started && openBraces === 0) {
        endIndex = i + 1;
        break;
    }
}

if (endIndex === -1) {
    console.error("Could not find end");
    process.exit(1);
}

const objStr = content.substring(startIndex + 'export const PROGRAMAS_DB: Record<string, Record<string, string>> = '.length, endIndex);
const db = eval('(' + objStr + ')');

const newDb = {};
let count = 0;
for (const [id, prog] of Object.entries(db)) {
    if (prog.facultad && prog.facultad.includes('Económicas')) {
        prog.descripcion = 'Programa oficial de la Facultad de Ciencias Económicas enfocado en la alta calidad académica.';
        count++;
        newDb[count] = prog;
        newDb[count].id = count.toString();
    }
}

console.log(`Kept ${count} programs out of ${Object.keys(db).length}`);

const newObjStr = JSON.stringify(newDb, null, 2).replace(/"([^"]+)":/g, '$1:');

const newContent = content.substring(0, startIndex) + 'export const PROGRAMAS_DB: Record<string, Record<string, string>> = ' + newObjStr + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log("Updated programasData.ts");
