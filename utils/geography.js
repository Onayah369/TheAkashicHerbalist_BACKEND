const countryToContinent = {
    India: "Asia",
    China: "Asia",
    Japan: "Asia",
    Indonesia: "Asia",
    Iran: "Asia",
    Iraq: "Asia",
    Nepal: "Asia",

    Spain: "Europe",
    Iceland: "Europe",
    Germany: "Europe",
    France: "Europe",
    Italy: "Europe",
    Hungary: "Europe",
    Greece: "Europe",

    Egypt: "Africa",
    Kenya: "Africa",
    Nigeria: "Africa",
    "South Africa": "Africa",
    Morocco: "Africa",

    "United States": "North America",
    Canada: "North America",
    Mexico: "North America",

    Brazil: "South America",
    Argentina: "South America",
    Peru: "South America",

    Australia: "Oceania",
    "New Zealand": "Oceania"
};

const getContinent = (country) => {
    return countryToContinent[country] || null;
};

module.exports = { getContinent };