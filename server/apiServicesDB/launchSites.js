const axios = require('axios');
const db = require('../db');
const format = require('pg-format');

/* The purpose of launchsites.js is to fetch all data from a third-party API that contains data on launch sites and then to insert certain data on each launch site into the launch_sites table on the stellar_travel DB.


/* Make multiple requsts to launch sites API and return all launc sites objects in an [].*/

const getAllLaunchSites = async () => {
    const url = "https://ll.thespacedevs.com/2.2.0/location/";
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

/* Invoke getAllLaunchSites() function and pass its return value - dataAll [] - to the saveToDb() function. */

getAllLaunchSites().then((launchSites) => {
    saveToDb(launchSites)
}).catch((error) => {
    console.log(error);
});


/* Iterate return value of getAllLaunchSites() function - dataAll [] - and insert the id, name, country_code, total_launch_count, map_image of each launch site into the launch_sites table. */

async function saveToDb(launchSites) {
    let allArrays = [];

    for (let ls of launchSites) {

        const { id, name, country_code, total_launch_count, map_image } = ls;

        let arrData = [id, name, country_code, total_launch_count, map_image];
        allArrays.push(arrData);
    };

    const query = format(`INSERT INTO launch_sites (id, site_name, country_code, launch_count, site_img_url) VALUES %L RETURNING id`, allArrays);

    try {
        const result = await db.query(query)
    } catch (error) {
        console.log(error);
    };
    console.log("launch_sites table is seeded. ")
    process.exit();
};


