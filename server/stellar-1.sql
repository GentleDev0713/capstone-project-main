\echo 'Delete and recreate stellar_travel db?'
\prompt 'Return for yes or control-C to cancel>' foo

-- *Please read before running any SQL files
-- stellar-1.sql should be run only for development.

-- Regarding creating DB, tables, and table seeding:
-- Running stellar-1.sql will:
--     1. Create the Db,
--     2. Run: A. stellar-schema.sql, and then B. stellar-seed-1.sql
--         stellar-schema.sql will create the tables.
--         stellar-seed-1.sql will:
--             1. Seed all tables with an adequate number of records in all tables in order to determine the application's functionality and aesthetics.

DROP DATABASE IF EXISTS stellar_travel;
CREATE DATABASE stellar_travel;
\connect stellar_travel

\i stellar-schema.sql
\i stellar-seed-1.sql

-- \echo 'Delete and recreate stellar_travel_test db?'
-- \prompt 'Return for yes or control-C to cancel>' foo

-- DROP DATABASE stellar_travel_test;
-- CREATE DATABASE stellar_travel_test;
-- \connect stellar_travel_test

-- \i stellar-schema.sql