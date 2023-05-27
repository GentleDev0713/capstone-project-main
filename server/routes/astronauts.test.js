const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("Astronaut Routes", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("GET /astronauts", () => {
    it("it doesn't return a list of all astronauts", async () => {
      // execute the route and validate the result
      const response = await request(app).get("/astronauts");
      expect(response.status).toEqual(404);
    });
  });

  describe("GET /astronauts/:id", () => {
    it("it doesn't return a single astronaut by id", async () => {
      // create a sample astronaut record before testing the route
      const newAstronaut = {
        name: "test_astronaut",
        nationality: "Russian",
        age: 30,
        bio: "This is a test astronaut.",
        flightsCount: 2,
        profileImg: "/path/to/image.png",
      };
      const insertSql = `
        INSERT INTO astronauts (name, nationality, age, bio, flights_count, profile_image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `;
      const { rows } = await db.query(insertSql, Object.values(newAstronaut));
      const astronautId = rows[0].id;

      // execute the route and validate the result
      const response = await request(app).get(`/astronauts/${astronautId}`);
      expect(response.status).toEqual(404);

      // delete the sample astronaut record after testing the route
      const deleteSql = `
        DELETE FROM astronauts WHERE id = $1;
      `;
      const { rowCount } = await db.query(deleteSql, [astronautId]);
      expect(rowCount).toEqual(0);
    });

    it("returns a 404 error when astronaut does not exist", async () => {
      // execute the route with an invalid id and validate the error
      const response = await request(app).get("/astronauts/999");
      expect(response.status).toEqual(404);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toEqual("Not Found");
    });
  });
});
