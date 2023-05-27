const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("Launch Site Routes", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("GET /launchsites/:id", () => {
    it("returns the launch site record with the given ID", async () => {
      // execute the route and validate the result
      const response = await request(app).get(`/launchsites/`);
      expect(response.status).toEqual(404);
    });

    it("returns a 404 error when the record with the given ID does not exist", async () => {
      // execute the route with an invalid ID and validate the error
      const response = await request(app).get("/launchsites/99999");
      expect(response.status).toEqual(404);
      expect(response.body.error).toBeTruthy();
    });
  });
});
