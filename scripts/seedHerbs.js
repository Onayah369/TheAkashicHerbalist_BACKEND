require("dotenv").config();

const connectDB = require("../config/db");
const Herb = require("../models/Herb");

const loadImppat = require("./loadImppat");
const starterHerbs = require("./starterHerbs");
const { getTreflePlant } = require("../services/trefleService");

async function seedHerbs() {
    await connectDB();

    const herbData = [];

    for (const scientificName of starterHerbs) {
        const imppatHerb = loadImppat[scientificName];

        if (!imppatHerb) {
            continue;
        }

        const trefleHerb = await getTreflePlant(scientificName);

        if (!trefleHerb) {
            continue;
        }

        const commonNames = trefleHerb.common_names?.en || [];

        herbData.push({
            name: trefleHerb.common_name || scientificName,
            scientificName,
            family: trefleHerb.family || null,
            commonNames,
            nativeRegions: trefleHerb.distribution?.native || [],
            traditionalUses: imppatHerb.traditionalUses,
            image: trefleHerb.image_url || null,
        });
    }

    await Herb.deleteMany({});
    await Herb.insertMany(herbData);

    console.log("\n===============================");
    console.log(`Successfully seeded ${herbData.length} herbs.`);
    console.log("===============================");

    herbData.forEach((herb) => {
        console.log(`✓ ${herb.name} - ${herb.traditionalUses.length} traditional uses`);
    });

    process.exit();
}

seedHerbs();