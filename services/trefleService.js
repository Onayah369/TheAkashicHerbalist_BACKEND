require("dotenv").config();

async function getTreflePlant(scientificName) {
    const slug = scientificName
        .toLowerCase()
        .replace(/x/g, "x")
        .replace(/\s+/g, "-");

    const response = await fetch(`https://trefle.io/api/v1/species/${slug}?token=${process.env.TREFLE_TOKEN}`);
    if (!response.ok) {
        console.log(`Trefle API request failed for ${scientificName}: ${response.status}`);
        return null;
    }
    const data = await response.json();
    return data.data;
}

module.exports = { getTreflePlant };