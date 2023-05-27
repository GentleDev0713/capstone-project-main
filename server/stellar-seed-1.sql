-- The password for testuser and testadmin is password

-- PLEASE READ: 
-- stellar-seed-1.sql is should be run by itself when using only the below seed data to view how the site functions and looks when in development.  
-- stellar-seed-2.sql should be used when deploying the site.

INSERT INTO users (username, password, first_name, last_name, age, email, phone, user_img_url, is_admin)
VALUES('testuser','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Test', 'User', 30, 'mail@mail.com', 1112223333, 'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg', FALSE),
('testadmin','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Test', 'Admin', 30, 'admin@mail.com', 3334445555, 'https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg', TRUE),
('bubbagump','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Bubba', 'Gump', 25, 'bubba@mail.com', 4442228888, 'https://imagez.tmz.com/image/02/o/2021/08/03/0298220abbe0428897ff64b0a6ee260e_lg.jpg', FALSE),
('darthvader','$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'Darth', 'Vader', 90, 'admin@mail.com', 6667779999, 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/15/50/1449498579-darth-vader-star-wars.jpg', FALSE);


INSERT INTO astronauts (id, name, nationality, age, flights_count, profile_image, bio)
VALUES(10000, 'Apollo Achilles', 'Greek', 55, 3, 'https://static.independent.co.uk/2023/03/20/18/20175737-d8b25395-63d7-42bc-a87b-47bf36776bdf.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10001, 'Chuck Norris', 'Italian', 33, 15, 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/15/50/1449498579-darth-vader-star-wars.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10002, 'Fleetwood mack', 'American', 55, 0, 'https://www.nasa.gov/sites/default/files/thumbnails/image/jsc2018e083590_alt.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10003, 'Fredrick Wagner', 'French', 43, 2, 'https://upload.wikimedia.org/wikipedia/commons/9/96/Heidemarie_Stefanyshyn-Piper_in_white_space_suit.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10004, 'Scott Tingle', 'Chinese', 39, 1, 'https://www.nasa.gov/sites/default/files/thumbnails/image/jsc2017e129520.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10005, 'Mark Vande', 'Russian', 23, 7, 'https://www.nasa.gov/sites/default/files/thumbnails/image/jsc2016e000683_alt.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10006, 'Stefanyshyn Piper', 'English', 39, 4, 'https://upload.wikimedia.org/wikipedia/commons/9/96/Heidemarie_Stefanyshyn-Piper_in_white_space_suit.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10007, 'Soichi Noguchi', 'Kenyan', 83, 10, 'https://media.defense.gov/2020/Apr/23/2002287550/-1/-1/0/200420-F-F3751-1001.JPG', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10008, 'Shannon Walker', 'Cuba', 66, 3, 'https://www.nasa.gov/sites/default/files/styles/side_image/public/thumbnails/image/jsc2009e208081.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10009, 'Ricky Arnold', 'German', 50, 22, 'https://www.nasa.gov/sites/default/files/thumbnails/image/jsc2017e137826_alt.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10010, 'Niel Armstrong', 'Canadian', 45, 6, 'https://images.pexels.com/photos/41952/neil-armstrong-armstrong-astronaut-space-suit-41952.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10011, 'Nick Hague', 'Mexian', 28, 16, 'https://www.nasa.gov/sites/default/files/thumbnails/image/jsc2018e037944_alt2.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10012, 'Dani Tani', 'Bolivian', 47, 10, 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/1302/852199/1000w_q95.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10013, 'Scott Tingle', 'Japanese', 75, 9, 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/1302/852199/1000w_q95.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10014, 'Christer Fuglesang', 'Icelandic', 51, 0, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Christer_Fuglesang.jpg/1280px-Christer_Fuglesang.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
(10015, 'Steven Wexler', 'Persian', 60, 1, 'https://files.ekmcdn.com/spaceboosters/images/nasa-astronaut-alvin-drew-8-x10-full-colour-portrait-1727-p.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');


INSERT INTO spacecraft (id, spacecraft_name , agency_name, agency_description, country, spacecraft_img_url)
VALUES(200, 'Death Star', 'Evil Empire', 'We destroy things.', 'All', 'https://www.emk.com/product/image/medium/ikniu521472_1.jpg'),
(201, 'X-Wing', 'The Force', 'We save things.', 'Peacelandia', 'https://i.stack.imgur.com/HoPuG.jpg'),
(202, 'Ti Fighter', 'Darkness', 'Destroyer of all things', 'Death Start', 'https://images.interestingengineering.com/images/import/2016/12/tie-fighter.jpg'),
(203, 'Millennium Falcon', 'Free Lance', 'We work for gold.', 'Nowherelandia', 'https://bbts1.azureedge.net/images/p/full/2017/11/96ccd4dd-4418-4777-a941-1d82f60813ed.jpg'),
(204, 'Prometheus', 'Stargate Command', 'Trying to survive.', 'USA', 'https://www.gateworld.net/wiki/images/6/6e/Prometheus.jpg'),
(205, 'Daedalus', 'Gauld Command', 'We conquer things.', 'Black Hole', 'https://i0.wp.com/downthetubes.net/wp-content/uploads/2021/09/stgen001_stargateships_daedalus_background.jpg'),
(206, 'Gauld Hunder', 'Tauri Command', 'We are warriors', 'Tauri', 'https://w0.peakpx.com/wallpaper/786/394/HD-wallpaper-sci-fi-spaceship-tv-show-stargate-sg-1-stargate.jpg'),
(207, 'USS Enterprise NCC', 'Startreckers', 'We go everywhere', 'North America', 'https://scifiview.com/wp-content/uploads/2021/04/2_st_USS_Enterprise_NCC.png');


INSERT INTO launch_sites (id, site_name, country_code, launch_count, site_img_url)
VALUES(300, 'Cape Canaveral', 'USA', 500, 'https://cdn.mos.cms.futurecdn.net/htNMV5MyYuzvKrBnDV6QU6-1920-80.jpg'),
(301, 'Reggane', 'DZ', 10, 'https://mars.nasa.gov/system/resources/detail_files/3764_Atlas_V_at_Launch_Pad_2011-7916-full2.jpg'),
(302, 'CNES', 'FR', 22, 'https://cdn.mos.cms.futurecdn.net/htNMV5MyYuzvKrBnDV6QU6-1920-80.jpg'),
(303, 'Ruscovaz', 'RUS', 70, 'https://mars.nasa.gov/system/resources/detail_files/3764_Atlas_V_at_Launch_Pad_2011-7916-full2.jpg'),
(304, 'Il Sitio', 'ITL', 11, 'https://cdn.mos.cms.futurecdn.net/htNMV5MyYuzvKrBnDV6QU6-1920-80.jpg'),
(305, 'Berlin Blastoff', 'GER', 41, 'https://mars.nasa.gov/system/resources/detail_files/3764_Atlas_V_at_Launch_Pad_2011-7916-full2.jpg'),
(306, 'La Redonda', 'MEX', 3, 'https://cdn.mos.cms.futurecdn.net/htNMV5MyYuzvKrBnDV6QU6-1920-80.jpg'),
(307, 'Maple Site', 'CAN', 10, 'https://mars.nasa.gov/system/resources/detail_files/3764_Atlas_V_at_Launch_Pad_2011-7916-full2.jpg');


INSERT INTO planets (id, planet_name, planet_description, planet_distance, planet_img_url)
VALUES
(1, 'Mercury', 'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets in our solar system', 0.000011, 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg'),
(2, 'Venus', 'Venus is the second planet from the Sun and is named after the Roman goddess of love and beauty. As the brightest natural object in Earth''s night sky after the Moon, Venus can cast shadows and can be visible to the naked eye in broad daylight', 0.000004, 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg'),
(4, 'Mars', 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often called the \\\"Red Planet\\\".\"', 0.000037, 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'),
(5, 'Jupiter', 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.', 0.000088, 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'),
(6, 'Saturn', 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.', 0.00017, 'https://www.universetoday.com/wp-content/uploads/2008/07/saturncolor.jpg'),
(7, 'Uranus', 'Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares, grandfather of Zeus and father of Cronus. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.', 0.000304, 'https://upload.wikimedia.org/wikipedia/commons/4/48/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29.png'),
(8, 'Neptune', 'Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, and slightly more massive than its near-twin Uranus.', 0.000478, 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'),
(9, 'Pluto', 'Pluto is a dwarf planet that lies in the Kuiper Belt, an area full of icy bodies and other dwarf planets out past Neptune. Pluto is very small, only about half the width of the United States and its biggest moon Charon is about half the size of Pluto.', 0.000559, 'https://cdn.uanews.arizona.edu/s3fs-public/styles/uaqs_large/public/story-images/Pluto%20whole%20color.png');


INSERT INTO missions (mission_name, launch_date, created_on, user_id, planet_id, commander_id, captain_id, navigator_id, spacecraft_id, launch_site_id)
VALUES('A weekend on Saturn.', '2023-04-24T17:45', NOW(), 1, 6, 10000, 10005, 10010, 200, 300 ),
('A long day at the spa Mercury.', '2023-08-02T7:00', NOW(), 2, 1, 10001, 10006, 10011, 201, 301),
('Hitting the slopes on Pluto.', '2021-12-24T01:30', NOW(), 3, 9,  10002, 10007, 10012, 202, 302),
('Chasing storm on Mars.', '2025-06-01T05:00', NOW(), 4, 4, 10003, 10008, 10013, 203, 303),
('Love in the time of Jupiter.', '2026-04-01T17:00', NOW(), 1, 5, 10004, 10009, 10014, 204, 304);