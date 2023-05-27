const db = require('../db');
const { NotFoundError } = require("../expressError");

/* Planet class. Has a static method to get all or get one record from planets table */

class Planet {

    /* GET all planets.  
   Returns: { planets: [ {id, planetName, planetDescription, planetDistance, planetImg}, ... ] }.
   Authorization required: none.
   */
    static async getAll() {
        const results = await db.query(`
        SELECT 
            id, 
            planet_name AS "planetName", 
            planet_description AS "planetDescription", 
            planet_distance AS "planetDistance", 
            planet_img_url AS "planetImg" 
        FROM planets`);
        return results.rows
    };


    /* GET one planet.  
    Returns: { planet: [ {id, planetName, planetDescription, planetDistance, planetImg} ] }.
    Authorization required: none.
    */

    static async getOne(id) {
        const result = await db.query(
            `SELECT 
            id,
            planet_name AS "planetName", 
            planet_description AS "planetDescription", 
            planet_distance AS "planetDistance", 
            planet_img_url AS "planetImg" 
            FROM planets 
            WHERE id=$1`, [id]);
        const planet = result.rows[0];
        if (!planet) throw new NotFoundError(`Planet with the id of ${id} not found.`);
        return planet;
    };
};

module.exports = Planet;