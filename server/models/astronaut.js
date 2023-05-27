"use strict"
const db = require('../db')
const { NotFoundError } = require("../expressError");

/* Astronaut class. Has a static method to get all or get one record from astronauts table */

class Astronaut {

    /* GET all astronauts.  
 Returns: { astronauts: [ {id, name nationality, age, bio, flightsCount, profileImg}, ... ] }.
    Authorization required: none.
    */

    static async getAll() {
        const result = await db.query(
            `SELECT 
                id, 
                name,
                nationality, 
                age,
                bio,
                flights_count AS  "flightsCount", 
                profile_image as "profileImg"
            FROM  astronauts`
        );
        return result.rows;
    };


    /* GET one astronaut based on id..  
Returns: { astronauts: [ {id, name, nationality, age, bio, flightsCount, profileImg}, ... ] }.
Authorization required: none.
*/

    static async getOne(id) {
        const result = await db.query(
            `SELECT 
                id,
                name,
                nationality, 
                age,
                bio,
                flights_count AS  "flightsCount", 
                profile_image as "profileImg"
            FROM astronauts 
            WHERE id=$1`, [id]);
        const astronaut = result.rows[0];
        if (!astronaut) throw new NotFoundError(`Astronaut with id of ${id} not found.`);
        return astronaut;
    };
};

module.exports = Astronaut;