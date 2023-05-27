const db = require("../db");
const Astronaut = require("./astronaut");
const { NotFoundError } = require("../expressError");

describe("Astronaut", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("getAll", () => {
    it("returns a list of all astronauts", async () => {
      // execute getAll and validate the result
      const result = await Astronaut.getAll();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBeTruthy();
    });
  });

  describe("getOne", () => {
    it("returns a single astronaut by id", async () => {
      const astronauts = await Astronaut.getAll();
      const astronautId = astronauts[0].id;

      // execute getOne and validate the result
      const astronaut = await Astronaut.getOne(astronautId);
      expect(astronaut).toBeTruthy();
    });

    it("throws a NotFoundError when astronaut does not exist", async () => {
      // execute getOne with an invalid id and validate the error
      await expect(Astronaut.getOne(999)).rejects.toThrow(NotFoundError);
    });
  });
});
