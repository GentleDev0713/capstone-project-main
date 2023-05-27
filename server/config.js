"use strict";

//Configurations for: 1. BCRYPT_WORK_FACTOR, 2. getDatabaseUri() , 3. PORT, 4. SECRET_KEY.  Are exported and therefore avaialble in other .js files.

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-key";

const PORT = process.env.PORT || 3001;

//Three DB options based on env value: 1. Test EB, 2. Production DB, 3. Deployement DB.

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "stellar_travel_test"
    : process.env.DATABASE_URL || "stellar_travel";
}

//Reduces Bcrypt work factor for faster testing and increases it for a development or deployment.
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// console.log("Stellar Travel Config:".green);
// console.log("SECRET_KEY:".yellow, SECRET_KEY);
// console.log("PORT:".yellow, PORT.toString());
// console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
// console.log("Database:".yellow, getDatabaseUri());
// console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
