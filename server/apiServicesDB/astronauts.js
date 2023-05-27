const db = require('../db');
const axios = require('axios');
const format = require('pg-format');

/* The purpose of astronauts.js is to fetch all data from a third-party API that contains data on astronauts and then to insert certain data on each astronaut into the astronauts table on the stellar_travel DB.


/* Make multiple requsts to astronauts API and return all astronaut objects in an [].*/

const getAllAstronauts = async () => {
    const url = "https://ll.thespacedevs.com/2.2.0/astronaut/?limit=100";
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

/* Invoke getAllAstronauts() function and pass its return value - dataAll [] - to the saveToDb() function. */

getAllAstronauts().then((astronauts) => {
    saveToDb(astronauts)
}).catch((error) => {
    console.log(error);
});


/* Iterate return value of getAllAstronauts() function - dataAll [] - and insert the id, name, nationality, age, flights_count, profile_image, bio of each astronaut into the astronauts table. */

async function saveToDb(astronauts) {
    let allArrays = []
    for (let a of astronauts) {
        const { id, name, nationality, age, flights_count, profile_image, bio } = a;

        let arrData = [id, name, nationality, age, flights_count, profile_image, bio];
        allArrays.push(arrData);
    };

    const query = format(`INSERT INTO astronauts (id, name, nationality, age, flights_count, profile_image, bio) VALUES %L RETURNING id`, allArrays);

    try {
        const result = await db.query(query)
        console.log("Astronauts table is seeded. ")
    } catch (error) {
        console.log(error);
    };
    process.exit();
};