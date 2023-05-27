Capstone Project Framework

Project name: Stellar Travel Agency
Student: Andres Sanchez

Overview
It will be a website where users can plan a voyage to a planet in our solar system.

Goals
The user will choose: 1. A destination from a list of planets, 2. The crew from a list of former and current astronauts, 3. The spaceship from a list of spaceships, and 3. The launch site from a list of launch sites.  The user will also be informed of how long the voyage will take in years by coverting light years to years.

The above will be stored as a “mission” on the DB which the user can access and update at any time.  The user’s page will render the details of the mission, the launch date, and possible a coundown to launch time. 

Specifications

1. Tech
	Fullstack website
		Front End: React.js
		Back End: Node.js and Express
	Database: PostgreSQL

2. APIs:
	https://api-ninjas.com/api/planets
https://rapidapi.com/newbAPIOfficial/api/planets-info-by-newbapi/
https://ll.thespacedevs.com/2.2.0/astronaut/
https://ll.thespacedevs.com/2.2.0/location/
https://ll.thespacedevs.com/2.2.0/swagger/#/config/config_spacecraft_list


3. Site Data and Data Collection
a. At present, all data available on the site related to the astronauts, planets, mode of transportation, and 
launch site a user can choose will come from one of the above APIs.
b. Data collected from users: username, first name, last name, password, email address, phone number, age, and image url.  Default administrator status is false

4. Preliminary Database Schema
user_id, planet_id, commander_id, captain_id, navigator_id, spacecraft_id, launch_site_id

NOTE: see db-schema.png (in the same directory) for an image of the DB schema.
 
Description of Database Tables

Table – Users
PK: id
Purpose: Store profile information on each user.

Table – Planets
PK: id
Purpose: Store basic information on each planet.

Table – lauch_sites
PK: id
Purpose: Store basic information on each launch site.

Table – astronauts
PK: id
Purpose: Store basic information on each astronaut.

Table – spacecraft
PK: id
Purpose: Store basic information on each spacecraft.

Table – missions
PK: id
FK: user_id, planet_id, commander_id, captain_id, navigator_id, spacecraft_id, launch_site_id
Purpose: Store basic information on each mission and connect to the relevant record(s) in other tables via a FK.


5. Potential issues with APIs
For planets, two APIs required.  Neither contains all data required for desired data set presented to user (one has the URL for an image for each planet, and the other one has the distance each planet is from earth).
One API it is subject to rate limiting (15 calls per hour) for non-authenticated requests, and a limit of 100.
	Solution: purchase a token to increase reate calls to 45 per hour with no data limits.

6. Possible Additional Functionality
	Internal messaging system for user and crew memembers to communicate
	Notify user via text 24 hours before launch date
	At launch time, a video showing a rocket launch will appear on the user’s profile page
		A link to this video will be sent to the user at launch time

7. Sensitive Information
- Username
- password
- personal data

It routes and components that related to or that render this data are protected.  A user’s password is hashed and is then strored on DB, and the hashed password is never returned via a DB query.

8. App Functionality
The app allows an individual to create a user account.  A registered and logged-in user can create a mission to a planet which entails choosing the destination planet, three crew members from a list of astronauts, the spacecraft, the launchsite, and the launch date.  A logged-in user can likewise update the mission.  A logged in administrator can do all of the above as well. 

9. Milestones

 This is a preliminary proposal.  It will undergo various changes as the application is developed and obstacles encountered.  Furthermore, currently-listed funtionality may be omitted and additional functionality and content may form part of the final project.  