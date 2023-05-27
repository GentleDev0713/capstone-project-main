const axios = require('axios');
const db = require('../db');
const format = require('pg-format');

/* The purpose of spacecraft.js is to fetch all data from a third-party API that contains data on spacecraft and then to insert certain data on each spacecraftinto the spacecraft table on the stellar_travel DB.


/* Make multiple requsts to spacecraft API and return all spacecraft objects in an [].*/

const getAllSpacecraft = async () => {
    const url = "https://ll.thespacedevs.com/2.2.0/config/spacecraft/";
    let dataAll = [];
    try {
        let next = url;
        while (next) {
            const response = await axios.get(next, {
                headers: { Authorization: "Token 70a64d13d6eb2785040d454d3054f02055505b28" },
            });
            dataAll.push(...response.data.results);
            next = response.data.next;
        };
        return dataAll;
    } catch (err) {
        console.error(err);
    };
};

/* Invoke getAllSpacecraft() function and pass its return value - dataAll [] - to the saveToDb() function. */

getAllSpacecraft().then((spacecraft) => {
    saveToDb(spacecraft)
}).catch((error) => {
    console.log(error);
});


/* Iterate return value of getAllSpacecraft() function - dataAll [] - and insert the id, name, agency_name, agency_description, country, and image_url of each spacecraft into the spacecraft table. */


async function saveToDb(spacecraft) {
    let allArrays = []

    for (let sc of spacecraft) {

        /* Set propety values and nestd property values to keys. */

        let objData = { id: sc.id, craftName: sc.name, agencyName: sc.agency.name, description: sc.agency.description, country: sc.agency.country_code, craftImg: sc.image_url };

        const { id, craftName, agencyName, description, country, craftImg } = objData;

        let arrData = [id, craftName, agencyName, description, country, craftImg];
        allArrays.push(arrData)
    };

    const query = format(`INSERT INTO spacecraft (id, spacecraft_name , agency_name, agency_description, country, spacecraft_img_url) VALUES %L RETURNING id`, allArrays);

    try {
        const result = await db.query(query);
        console.log("Spacecraft table is seeded. ");
    } catch (error) {
        console.log(error);
    };
    process.exit();
};