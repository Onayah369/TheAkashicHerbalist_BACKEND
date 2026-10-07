require("dotenv").config();

const connectDB = require("../config/db");
const Herb = require("../models/Herb");

const loadImppat = require("./loadImppat");
const { getTreflePlant } = require("../services/trefleService");
const { categorizeUses } = require("../utils/useCategories");
const { getContinent } = require("../utils/geography");

// Curated herbs for the presentation/demo dataset.
// displayName controls what users see in the app.
const presentationHerbs = [
    {
        scientificName: "Calendula officinalis",
        displayName: "Calendula",
    },
    {
        scientificName: "Melissa officinalis",
        displayName: "Lemon Balm",
    },
    {
        scientificName: "Valeriana officinalis",
        displayName: "Valerian",
    },
    {
        scientificName: "Hypericum perforatum",
        displayName: "St. John's Wort",
    },
    {
        scientificName: "Foeniculum vulgare",
        displayName: "Fennel",
    },
    {
        scientificName: "Glycyrrhiza glabra",
        displayName: "Licorice",
    },
    {
        scientificName: "Ginkgo biloba",
        displayName: "Ginkgo",
    },
    {
        scientificName: "Silybum marianum",
        displayName: "Milk Thistle",
    },
    {
        scientificName: "Achillea millefolium",
        displayName: "Yarrow",
    },
    {
        scientificName: "Sambucus nigra",
        displayName: "Elderberry",
    },
    {
        scientificName: "Cinnamomum verum",
        displayName: "Cinnamon",
    },
    {
        scientificName: "Syzygium aromaticum",
        displayName: "Clove",
    },
    {
        scientificName: "Moringa oleifera",
        displayName: "Moringa",
    },
    {
        scientificName: "Adansonia digitata",
        displayName: "Baobab",
    },
    {
        scientificName: "Centella asiatica",
        displayName: "Gotu Kola",
    },
    {
        scientificName: "Nelumbo nucifera",
        displayName: "Holy Lotus",
    },
    {
        scientificName: "Artemisia vulgaris",
        displayName: "Mugwort",
    },
    {
        scientificName: "Arctium lappa",
        displayName: "Burdock Root",
    },
    {
        scientificName: "Hibiscus sabdariffa",
        displayName: "Hibiscus",
    },
    {
        scientificName: "Verbascum thapsus",
        displayName: "Mullein",
    },
    {
        scientificName: "Althaea officinalis",
        displayName: "Marshmallow Root",
    },
    {
        scientificName: "Rubus idaeus",
        displayName: "Red Raspberry Leaf",
    },
    {
        scientificName: "Angelica archangelica",
        displayName: "Angelica Root",
    },
];

async function importPresentationHerbs() {
    await connectDB();

    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const herbConfig of presentationHerbs) {
        const { scientificName, displayName } = herbConfig;

        console.log(`\nProcessing: ${displayName} (${scientificName})`);

        const imppatHerb = loadImppat[scientificName];

        if (!imppatHerb) {
            console.log(`  ✗ IMPPAT data not found`);
            skipped++;
            continue;
        }

        const trefleHerb = await getTreflePlant(scientificName);

        if (!trefleHerb) {
            console.log(`  ✗ Trefle data not found`);
            skipped++;
            continue;
        }

        const nativeRegions = trefleHerb.distribution?.native || [];

        const herbData = {
            name: displayName,
            scientificName,
            family: trefleHerb.family || null,
            commonNames: trefleHerb.common_names?.en || [],
            nativeRegions,
            countries: nativeRegions,
            continents: [
                ...new Set(
                    nativeRegions
                        .map(getContinent)
                        .filter(Boolean)
                ),
            ],
            traditionalUses: imppatHerb.traditionalUses,
            usageCategories: categorizeUses(imppatHerb.traditionalUses),
            image: trefleHerb.image_url || null,
        };

        const existingHerb = await Herb.findOne({ scientificName });

        if (existingHerb) {
            await Herb.updateOne(
                { scientificName },
                { $set: herbData }
            );

            console.log(`  ↻ Updated ${displayName}`);
            updated++;
        } else {
            await Herb.create(herbData);

            console.log(`  ✓ Added ${displayName}`);
            added++;
        }
    }

    console.log("\n===============================");
    console.log("Presentation herb import complete");
    console.log(`Added: ${added}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log("===============================");

    process.exit();
}

importPresentationHerbs();