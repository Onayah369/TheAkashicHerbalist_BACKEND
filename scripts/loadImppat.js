const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "..", "IMPPAT_TherapeuticUse_Plant_Association.tsv");

const file = fs.readFileSync(filePath, 'utf8');
const lines = file.split('\n').slice(1); 

const herbs = {};

for (const line of lines) {
    const columns = line.split('\t');

    const scientificName = columns[1]?.trim();
    const plantPart = columns[2]?.trim();
    const therapeuticUse = columns[4]?.trim();

    if (!scientificName || !therapeuticUse) continue;

    if (!herbs[scientificName]) {
        herbs[scientificName] = {
            scientificName,
            traditionalUses: [],
        };
    }

    herbs[scientificName].traditionalUses.push({
        use: therapeuticUse,
        plantPart: plantPart || null,
    });
}

console.log(`Loaded ${Object.keys(herbs).length} herbs from IMPPAT.`);

const firstHerbs = Object.values(herbs).slice(0, 10);

firstHerbs.forEach((herb) => {
    console.log("\n-------------------------------");
    console.log(`Scientific Name: ${herb.scientificName}`);
    console.log(`Number of uses: ${herb.traditionalUses.length}`);
});

module.exports = herbs;