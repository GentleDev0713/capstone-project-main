const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { PartialSQLUpdate } = require('../helpers/sql');

/* Mission class. Has a static methods to get all or get one record, and to add to, or update or delete a record on missions table.  */

class Mission {

    /* Create a new mission.  
    Returns: { mission:  {id, missionsName, launchDate, createdOn, userId, planetId, commanderId, captainId, navigatorId, spacecraftId, launchSiteId} }.
    Throws BadRequestError is mission name is duplicated.  
    Authorization required: is loggedIn or isAdmin.
    */

    static async createMission(data) {

        const duplicateCheck = await db.query(
            `SELECT mission_name
            FROM missions
            WHERE mission_name = $1`,
            [data.missionName],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Mission name '${data.missionName}' not available.`);
        };

        let createdOn = new Date().toJSON();

        const result = await db.query(
            `INSERT INTO missions 
            (mission_name, 
                launch_date, 
                created_on, 
                user_id, 
                planet_id, 
                commander_id, 
                captain_id, 
                navigator_id, 
                spacecraft_id, 
                launch_site_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING 
                id, 
                mission_name AS "missionName",  
                launch_date AS "launchDate", 
                created_on AS "createdOn", 
                user_id AS "userId", 
                planet_id AS "planetId", 
                commander_id AS "commanderId", 
                captain_id AS "captainId", 
                navigator_id AS "navigatorId", 
                spacecraft_id AS "spacecraftId", 
                launch_site_id AS "launchSiteId"`,
            [
                data.missionName,
                data.launchDate,
                createdOn,
                data.userId,
                data.planetId,
                data.commanderId,
                data.captainId,
                data.navigatorId,
                data.spacecraftId,
                data.launchSiteId
            ]);
        const newMission = result.rows[0];
        return newMission;
    };


    /* GET all missions.  
    Returns: { missions: [ {id, missionsName, launchDate, createdOn,, userId, planetName, distance, commanderName, captainName, navigatorName, spacecraftName, launchSiteName}, ... ] }.
    Authorization required: isAdmin.*/

    static async getAll() {
        const result = await db.query(`
        SELECT 
            missions.id, 
            missions.mission_name AS "missionName",  
            missions.launch_date AS "launchDate", 
            missions.created_on AS "createdOn", 
            missions.user_id AS "userId",
            planets.planet_name AS "planetName", 
            planets.planet_distance AS "distance",
            astronauts.name AS "commanderName", 
            capt.name AS "captainName", 
            nav.name AS "navigatorName", 
            spacecraft.spacecraft_name AS "spacecraftName", 
            launch_sites.site_name AS "launchSiteName" 
        FROM missions
        LEFT JOIN astronauts nav on missions.navigator_id = nav.id
        LEFT JOIN astronauts capt on missions.captain_id = capt.id
        LEFT JOIN astronauts on missions.commander_id = astronauts.id
        LEFT JOIN launch_sites ON missions.launch_site_id = launch_sites.id
        LEFT JOIN spacecraft ON missions.spacecraft_id = spacecraft.id
        LEFT JOIN planets ON missions.planet_id = planets.id`
        );
        return result.rows;
    };

    /* GET asll user missions for one user
    Returns: { mission: [ {id, missionsName, launchDate, createdAt, userId, planetId, commanderId, captainId, navigatorId, engineerId, spacecraftId, launchSiteId} ] }.
    Authorization required: is loggedIn or isAdmin.*/

    static async getUserMissions(user_id) {
        const result = await db.query(
            `SELECT 
            missions.id AS "misionId", 
            missions.mission_name AS "missionName",  
            missions.launch_date AS "launchDate", 
            missions.created_on AS "createdOn", 
            missions.user_id AS "userId",
            planets.planet_name AS "planetName", 
            planets.planet_distance AS "distance",
            astronauts.name AS "commanderName", 
            capt.name AS "captainName", 
            nav.name AS "navigatorName", 
            spacecraft.spacecraft_name AS "spacecraftName", 
            launch_sites.site_name AS "launchSiteName" 
        FROM missions
        LEFT JOIN astronauts nav on missions.navigator_id = nav.id
        LEFT JOIN astronauts capt on missions.captain_id = capt.id
        LEFT JOIN astronauts on missions.commander_id = astronauts.id
        LEFT JOIN launch_sites ON missions.launch_site_id = launch_sites.id
        LEFT JOIN spacecraft ON missions.spacecraft_id = spacecraft.id
        LEFT JOIN planets ON missions.planet_id = planets.id
        WHERE user_Id=$1`, [user_id]);
        const mission = result.rows;
        if (!mission) throw new NotFoundError(`No missions found for user with id of: ${user_id}.`);
        return mission;
    };


    /* Delete one mission based on user ID of a mission and a user ID.  It compares the user_id on a mission with the id of the user requesting to delete the mission. */
    static async remove(missionId, userId, isAdmin) {


        if (isAdmin) {
            const result = await db.query(
                `DELETE 
            FROM missions 
            WHERE id=$1
            RETURNING id`, [missionId]);
            const mission = result.rows[0];
            if (!mission) throw new NotFoundError(`No mission with that ID found.`);
        } else {
            const result = await db.query(
                `DELETE 
            FROM missions 
            WHERE id=$1 AND user_id=$2
            RETURNING id`, [missionId, userId]);
            const mission = result.rows[0];
            if (!mission) throw new NotFoundError(`No mission with that ID found.`);
        };
    };
};




// const result = await db.query(
//     `DELETE 
// FROM missions 
// WHERE id=$1 AND user_id=$2
// RETURNING id`, [missionId, userId]);
// const mission = result.rows[0];
// if (!mission) throw new NotFoundError(`No mission with that ID found.`);

module.exports = Mission;