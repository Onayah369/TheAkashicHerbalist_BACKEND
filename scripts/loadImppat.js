const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "..", "IMPPAT_TherapeuticUse_Plant_Association.tsv");

const file = fs.readFileSync(filePath, 'utf8');
const lines = file.split('\n').slice(1); 

const herbData = {};

for (const line of lines) {
    const columns = line.split('\t');

    const scientificName = columns[1]?.trim();
    const plantPart = columns[2]?.trim();
    const therapeuticUse = columns[4]?.trim();

    if (!scientificName || !therapeuticUse) continue;

    if (!herbData[scientificName]) {
        herbData[scientificName] = {
            scientificName,
            traditionalUses: [],
        };
    }

    herbData[scientificName].traditionalUses.push({
        use: therapeuticUse,
        plantPart: plantPart || null,
    });
}

module.exports = herbData;