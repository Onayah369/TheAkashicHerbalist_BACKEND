require("dotenv").config();

const connectDB = require("../config/db");
const Herb = require("../models/Herb");

const { getTreflePlant } = require("../services/trefleService");
const { getContinent } = require("../utils/geography");

// These herbs were not found in IMPPAT.
// Their traditional uses are kept separate from the IMPPAT dataset.
const additionalHerbs = [
    {
        scientificName: "Mentha x piperita",
        displayName: "Peppermint",
        traditionalUses: [
            {
                use: "Digestive support",
                plantPart: "Leaves",
            },
            {
                use: "Respiratory support",
                plantPart: "Leaves",
            },
        ],
        usageCategories: ["Digestive", "Respiratory"],
    },
    {
        scientificName: "Echinacea purpurea",
        displayName: "Echinacea",
        traditionalUses: [
            {
                use: "Immune support",
                plantPart: "Root",
            },
            {
                use: "Respiratory support",
                plantPart: "Aerial parts",
            },
        ],
        usageCategories: ["Immune", "Respiratory"],
    },
    {
        scientificName: "Taraxacum officinale",
        displayName: "Dandelion",
        traditionalUses: [
            {
                use: "Digestive support",
                plantPart: "Root",
            },
            {
                use: "Traditional liver and urinary support",
                plantPart: "Root",
            },
        ],
        usageCategories: ["Digestive", "Urinary"],
    },
    {
        scientificName: "Nymphaea caerulea",
        displayName: "Blue Lotus",
        traditionalUses: [
            {
                use: "Traditional relaxation support",
                plantPart: "Flowers",
            },
            {
                use: "Traditional calming support",
                plantPart: "Flowers",
            },
        ],
        usageCategories: ["Nervous System"],
        image: null,
    },
    {
        scientificName: "Turnera diffusa",
        displayName: "Damiana",
        traditionalUses: [
            {
                use: "Traditional relaxation support",
                plantPart: "Leaves",
            },
            {
                use: "Traditional digestive support",
                plantPart: "Leaves",
            },
        ],
        usageCategories: ["Nervous System", "Digestive"],
    },
    {
        scientificName: "Verbena hastata",
        displayName: "Blue Vervain",
        traditionalUses: [
            {
                use: "Traditional digestive support",
                plantPart: "Aerial parts",
            },
            {
                use: "Traditional relaxation support",
                plantPart: "Aerial parts",
            },
        ],
        usageCategories: ["Digestive", "Nervous System"],
    },
];

async function importAdditionalHerbs() {
    await connectDB();

    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const herbConfig of additionalHerbs) {
        const {
            scientificName,
            displayName,
            traditionalUses,
            usageCategories,
            image: fallbackImage,
        } = herbConfig;

        console.log(`\nProcessing: ${displayName} (${scientificName})`);

        const trefleHerb = await getTreflePlant(scientificName);

        if (!trefleHerb) {
            console.log("  ✗ Trefle data not found");
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
            traditionalUses,
            usageCategories,
            image: fallbackImage !== undefined
                ? fallbackImage
                : trefleHerb.image_url || null,
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
    console.log("Additional herb import complete");
    console.log(`Added: ${added}`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log("===============================");

    process.exit();
}

importAdditionalHerbs();