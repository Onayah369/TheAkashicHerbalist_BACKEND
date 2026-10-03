const { getTreflePlant } = require("../services/trefleService");

async function test() {
    const plant = await getTreflePlant("Curcuma longa");

    console.log("\n-------------------------------");
    console.log("Trefle test successful!");
    console.log("Scientific Name:" + plant?.scientific_name);
    console.log("Common Name: " + plant?.common_name);

    console.log(
        "English Common names:",
        plant?.common_names?.en || []
    );

    console.log("Family: " + plant?.family);
    console.log("Distribution: " + plant?.distribution);
    console.log("Image: " + plant?.image_url);
}

test();