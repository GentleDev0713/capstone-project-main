const db = require('../db');
const bcrypt = require("bcrypt");
const { PartialSQLUpdate } = require('../helpers/sql');
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { NotFoundError } = require("../expressError");

/* Astronaut class. Has a static method to get all or get one record from astronauts table */

class User {

    /* GET all users.  
   Returns: { users: [ {id, username, firstName, lastName, age, email, phone, userImg, isAdmin, missionCount}, ... ] }.
   Authorization required: isAdmin.
   */

    static async getAll() {
        const result = await db.query(
            `SELECT 
                users.id, 
                users.username, 
                users.first_name AS "firstName", 
                users.last_name AS "lastName", 
                users.age, 
                users.email, 
                users.phone, 
                users.user_img_url AS "userImg", 
                users.is_admin as "isAdmin",
            COUNT(missions.id) AS "missionCount"
            FROM users
            LEFT JOIN missions 
            ON users.id = missions.user_id
            GROUP BY users.id`);
        return result.rows
    };


    /* GET one user.  
Returns: { user: {id, firstName, lastName, age, email, phone, userImg, isAdmin, missionCount} }.
Authorization required: isCurrentUser or isAdmin.
*/
    static async getOne(id) {
        const result = await db.query(
            `SELECT 
                    users.id, 
                    users.username, 
                    users.first_name AS "firstName", 
                    users.last_name AS "lastName", 
                    users.age, 
                    users.email, 
                    users.phone, 
                    users.user_img_url AS "userImg", 
                    users.is_admin as "isAdmin",
                COUNT(missions.id) AS "missionCount"
                FROM users 
                LEFT JOIN missions 
                ON users.id = missions.user_id
                WHERE users.id=$1
                GROUP BY users.id`, [id]);
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`User with id of ${id} not found.`);
        return user;
    };


    /* Delete one user based on id.  
    Throws NotFoundEror if user not found.
    Authorization: isLoggedIn and currentUser, or isAdmin.*/

    static async remove(id) {
        const result = await db.query(
            `DELETE 
            FROM users 
            WHERE id=$1 
            RETURNING id`, [id]);
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`User with id of ${id} not found.`);
    };


    /* Update one user.  
Returns: { user: {id, username, firstName, lastName, age, email, phone, userImg, isAdmin} }.
Authorization required: isCurrentUser or isAdmin.
*/

    static async update(id, data) {

        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        };

        const { setCols, values } = PartialSQLUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
                age: "age",
                email: "email",
                phone: "phone",
                userImg: "user_img_url",
                isAdmin: "is_admin",
            });
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE users 
                  SET ${setCols} 
                  WHERE id = ${idVarIdx}
                  RETURNING 
                  id, 
                  username, 
                  first_name AS "firstName", 
                  last_name AS "lastName", 
                  age, 
                  email, 
                  phone, 
                  user_img_url AS "userImg", 
                  is_admin as "isAdmin"`;
        const result = await db.query(querySql, [...values, id]);
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`User with the id of '${id}' not found.`);
        delete user.password;
        return user;
    };
};

module.exports = User;