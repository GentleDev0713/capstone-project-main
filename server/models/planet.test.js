const db = require("../db");
const Planet = require("./planet");
const { NotFoundError } = require("../expressError");

describe("Planet", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("getAll", () => {
    it("returns a list of all planets", async () => {
      // execute getAll and validate the result
      const result = await Planet.getAll();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].planetName).toBeTruthy();
    });
  });

  describe("getOne", () => {
    it("returns a single planet by id", async () => {
      const rows = await Planet.getAll();
      const planetId = rows[0].id;

      // execute getOne and validate the result
      const planet = await Planet.getOne(planetId);
      expect(planet).toBeTruthy();
    });

    it("throws a NotFoundError when planet does not exist", async () => {
      // execute getOne with an invalid id and validate the error
      await expect(Planet.getOne(999)).rejects.toThrow(NotFoundError);
    });
  });
});
