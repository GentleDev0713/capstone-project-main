const db = require('../db');
const { BadRequestError, UnauthorizedError } = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

/* Auth class. Has a static method to register a new user and to login and authenticate a current user. */

class Auth {

    /* Register a new user. Prevents duplicate usernames.
   Returns: { newUser: [ {id, username, firstName, lastName, age, email, phone, userImg, isAdmin} ] }.
   Bcrypt is used to hash password stored on DB.
    Authorization required: none.
    */

    static async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [data.username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Username ${data.username} is not available.`);
        };

        const result = await db.query(
            `INSERT INTO users (
                username, 
                password, 
                first_name, 
                last_name, 
                age, 
                email, 
                phone, 
                user_img_url, 
                is_admin
            ) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING id, 
            username, 
            first_name AS "firstName", 
            last_name AS "lastName", 
            age, 
            email, 
            phone, 
            user_img_url AS "userImg", 
            is_admin as "isAdmin"`,
            [
                data.username,
                hashedPassword,
                data.firstName,
                data.lastName,
                data.age,
                data.email,
                data.phone,
                data.imgUrl,
                data.isAdmin]);
        const newUser = result.rows[0];
        return newUser;
    };


    /* Login/authenticate user.
  Returns: { user: [ {id, username, firstName, lastName, age, email, phone, userImg, isAdmin} ] }.
  Bcrypt hashes password input by user and compares the result to the password on the DB connected to username input by user.
   Authorization required: none.
   */

    static async authenticate(data) {

        const result = await db.query(
            `SELECT 
            id, 
            username, 
            password,
            first_name AS "firstName", 
            last_name AS "lastName", 
            age, 
            email, 
            phone, 
            user_img_url AS "userImg", 
            is_admin as "isAdmin"
           FROM users
           WHERE username = $1`,
            [data.username],
        );
        const user = result.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            };
        };
        throw new UnauthorizedError("The password or username is invalid.");
    };
};

module.exports = Auth;