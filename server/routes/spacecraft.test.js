const db = require("../db");
const Spacecraft = require("../models/spacecraft");
const { NotFoundError } = require("../expressError");

describe("Spacecraft", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("GET /spacecrafts", () => {
    it("returns a list of all spacecrafts", async () => {
      // execute getAll and validate the result
      const result = await Spacecraft.getAll();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].craftName).toBeTruthy();
    });
  });

  describe("GET /spacecrafts/:id", () => {
    it("returns a single spacecraft by id", async () => {
      const rows = await Spacecraft.getAll();
      const spacecraftId = rows[0].id;

      // execute getOne and validate the result
      const spacecraft = await Spacecraft.getOne(spacecraftId);
      expect(spacecraft).toBeTruthy();
    });

    it("throws a NotFoundError when spacecraft does not exist", async () => {
      // execute getOne with an invalid id and validate the error
      await expect(Spacecraft.getOne(999)).rejects.toThrow(NotFoundError);
    });
  });
});
