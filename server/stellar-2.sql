\echo 'Delete and recreate stellar_travel db?'
\prompt 'Return for yes or control-C to cancel>' foo

-- *Please read before running any SQL files
-- //Regarding DB creating and naming for an app to be deployed:
-- Heroku creates the name of the DB automatically, and it cannot be dropped or connected to as with the commands in stellar-1.sql.  Just steallar-schema.sql and stellar-seed-2.sql need to be run by this file when deploying on Heroku.  Then, 

-- Regarding creating of tables and seeding of tables.
-- The following is predicated on having deployed the application on a host and that it has a configured and properly operating database.

-- stellar-2.sql should be run only for deployment.  
-- It will run: 1. stellar-schema.sql, and then 2. stellar-seed-2.sql.  
-- stellar-schema.sql will create the tables. 
-- stellar-seed-2.sql will:
--         1. seed the users table with two users, one of which is an admin
--         2. seed the planets table with all records required for a deployed application.
-- Then, the three files in /server/apiServicesDB must be run in whichever host you are using.
--         astronauts.js will seed the astronauts table.  
--         launchSites.js will seed the launch_sites table.  
--         spacecraft.js will seed the spacecraft table.  
-- Once the above is completed, the database will be fully seeded for a deployed site.

\i stellar-schema.sql
\i stellar-seed-2.sql