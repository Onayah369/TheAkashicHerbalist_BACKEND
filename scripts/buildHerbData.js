require("dotenv").config();

const loadImppat = require("./loadImppat");
const starterHerbs = require("./starterHerbs");
const { getTreflePlant } = require("../services/trefleService");
const { categorizeUses } = require("../utils/useCategories");
const { getContinent } = require("../utils/geography");

async function buildHerbData() {
    const herbData = [];

    for (const scientificName of starterHerbs) {
        console.log(`\nFetching: ${scientificName}`);

        const imppatHerb = loadImppat[scientificName];

        if (!imppatHerb) {
            console.log(`IMPPAT data not found: ${scientificName}`);
            continue;
        }

        const trefleHerb = await getTreflePlant(scientificName);

        if (!trefleHerb) {
            console.log(`Trefle data not found: ${scientificName}`);
            continue;
        }

        const herb = {
            name: trefleHerb.common_name || scientificName,
            scientificName,
            family: trefleHerb.family || null,
            commonNames: trefleHerb.common_names?.en || [],
            nativeRegions: trefleHerb.distribution?.native || [],
            countries: trefleHerb.distribution?.native || [],
            continents: (trefleHerb.distribution?.native || [])
                .map(getContinent).filter(Boolean),
            traditionalUses: imppatHerb.traditionalUses,
            usageCategories: categorizeUses(imppatHerb.traditionalUses),
            image: trefleHerb.image_url || null,
        };

        herbData.push(herb);

        console.log(`Added: ${herb.name}`);
    }

    console.log("\n===============================");
    console.log(`Built ${herbData.length} herb records.`);
    console.log("===============================");

    return herbData;
}

buildHerbData();