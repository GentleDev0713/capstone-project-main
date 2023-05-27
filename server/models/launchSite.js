const db = require('../db');
const { NotFoundError } = require("../expressError");

/* LaunSite class. Has a static method to get all or get one record from launch_sites table */

class LaunchSite {

    /* GET all launchsites.  
   Returns: { launchSites: [ {id, siteName, countryCode, launchCount, siteImg}, ... ] }.
   Authorization required: none.*/

    static async getAll() {
        const result = await db.query(
            `SELECT 
                id, 
                site_name AS "siteName", 
                country_code AS "countryCode", 
                launch_count AS "launchCount", 
                site_img_url AS "siteImg" 
        FROM launch_sites`
        );
        return result.rows;
    };


    /* GET one launchsite.  
    Returns: { launchSite: [ {id, siteName, countryCode, launchCount, siteImg} ] }
    Authorization required: none.*/

    static async getOne(id) {
        const result = await db.query(
            `SELECT 
                id, 
                site_name AS "siteName", 
                country_code AS "countryCode", 
                launch_count AS "launchCount", 
                site_img_url AS "siteImg" 
        FROM  launch_sites 
        WHERE id=$1`, [id]);
        const launchSite = result.rows[0];
        if (!launchSite) throw new NotFoundError(`LaunchSite with id of: ${id} not found.`);
        return launchSite;
    };
};

module.exports = LaunchSite;