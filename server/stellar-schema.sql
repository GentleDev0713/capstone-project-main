CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(50) NOT NULL CHECK (position('@' IN email) > 1),
    phone VARCHAR(15) NOT NULL,
    user_img_url text,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE astronauts (
    id INTEGER UNIQUE,
    name VARCHAR(60) NOT NULL,
    nationality VARCHAR(20),
    age INTEGER,
    flights_count INTEGER,
    profile_image text,
    bio text NOT NULL
);

CREATE TABLE spacecraft (
    id INTEGER UNIQUE,
     spacecraft_name VARCHAR(50) NOT NULL,
    agency_name VARCHAR(50) NOT NULL,
    agency_description text NOT NULL,
    country VARCHAR(40) NOT NULL,
     spacecraft_img_url text
);

CREATE TABLE launch_sites (
    id INTEGER UNIQUE,
    site_name text NOT NULL,
    country_code VARCHAR(4) NOT NULL,
    launch_count INTEGER NOT NULL,
    site_img_url text NOT NULL
);

CREATE TABLE planets (
    id INTEGER PRIMARY KEY,
    planet_name VARCHAR(8) NOT NULL,
    planet_description text NOT NULL,
    planet_distance DECIMAL NOT NULL,
    planet_img_url text NOT NULL
);

CREATE TABLE missions (
    id SERIAL PRIMARY KEY,
    mission_name VARCHAR(40) UNIQUE NOT NULL,
    launch_date VARCHAR(20) NOT NULL,
    created_on VARCHAR(35) NOT NULL,
    user_id INTEGER NOT NULL,
    planet_id INTEGER NOT NULL,
    commander_id INTEGER NOT NULL,
    captain_id INTEGER NOT NULL,
    navigator_id INTEGER NOT NULL,
    spacecraft_id INTEGER NOT NULL,
    launch_site_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (planet_id)  REFERENCES planets(id),
    FOREIGN KEY (commander_id)  REFERENCES astronauts(id),
    FOREIGN KEY (captain_id)  REFERENCES astronauts(id),
    FOREIGN KEY (navigator_id)  REFERENCES astronauts(id),
    FOREIGN KEY (spacecraft_id)  REFERENCES spacecraft(id),
    FOREIGN KEY (launch_site_id)  REFERENCES launch_sites(id)
);