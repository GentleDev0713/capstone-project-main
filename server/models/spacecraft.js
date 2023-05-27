const db = require('../db');
const { NotFoundError } = require("../expressError");

/* Spacecraft class. Has a static method to get all or get one record(s) from spacecraft table */

class Spacecraft {

    /* GET all spacecraft.
    Returns: { spacecraft: [ {id, craftName, agencyName, agencyDescription, country, craftImg}, ... ] }.
    Authorization required: none.
    */

    static async getAll() {
        const result = await db.query(
            `SELECT 
                id, 
                spacecraft_name AS "craftName", 
                agency_name AS "agencyName", 
                agency_description AS "agencyDescription", 
                country, 
                spacecraft_img_url AS "craftImg" 
            FROM spacecraft`);
        return result.rows;
    };

    /* GET one spacecraft.
    Returns: { spacecraft: [ {id, craftName, agencyName, agencyDescription, country, craftImg}] }.
    Authorization required: none.
    */

    static async getOne(id) {
        const result = await db.query(
            `SELECT 
            id, 
            spacecraft_name AS "craftName", 
            agency_name AS "agencyName", 
            agency_description AS "agencyDescription", 
            country, 
            spacecraft_img_url AS "craftImg" 
            FROM spacecraft 
            WHERE id=$1`, [id]);
        const spacecraft = result.rows[0];
        if (!spacecraft) throw new NotFoundError(`Spacecraft with id of ${id} not found.`);
        return spacecraft;
    };
};

module.exports = Spacecraft;