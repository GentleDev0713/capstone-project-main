Application Name
Stellar Travel Agency

Application Description
An application consisting of a server and a client for the Capstone project.  It is an application that allows a user to book an inter-planetary voyage to a planet in our solar system. 

Technologies Uses
Client: React, Boostrap for navbar, axios
Sever: node, express, json webtoken, pg, nodemailer, and dotenv
    Third-party APIs:
        https://api-ninjas.com/api/planets      (For partial data on planets)
        https://rapidapi.com/newbAPIOfficial/api/planets-info-by-newbapi/   (For partial data on planets)
        https://ll.thespacedevs.com/2.2.0/astronaut/ (For data on astronauts)
        https://ll.thespacedevs.com/2.2.0/location/ (For data on launch sites)
        https://ll.thespacedevs.com/2.2.0/swagger/#/config/config_spacecraft_list (For data on spacecraft)


Instructions on creating DB, tables, and seeding tables based on usage
There are two options: 1. For Developent, 2. For Production

1. For Development 
Run stellar-1.sql.  This will create the DB and the tables and then run stellar-seed-1.sql.  This seed file inserts sufficient data in all tables to determine how the site works and looks.  


2. For Production

Step 1: Run stellar-2.sql. This will create the DB and the tables and then run stellar-seed-2.sql.  This seed file will insert two users in the users table, one of which is an admin.  It will also insert all the required data for the planets table. 

Step 2: in /server/apiServicesDB, run the following three files: 1. astronauts.js, 2. launchSites.js, and 3. spacecraft.js.  Each of these files will make requests to a third/party APIs and then insert the fetched data on the astronauts, launch_sites, and spacecraft tables.  

Afterwards, all the tables on the DB will be populated will all the data required for a production site.  


(INSTRUCTIONS) How to run - 2 options: development and production
    how to start server, how to start client
    Reference ENV file: create .env file (the 2 variables and what the values are for) they need to create their own email and password (which is the app password from Google)


1. List of contributors: myself

2. License - Free.