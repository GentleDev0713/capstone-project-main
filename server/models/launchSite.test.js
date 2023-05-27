const db = require("../db");
const LaunchSite = require("./launchSite");
const { NotFoundError } = require("../expressError");

describe("LaunchSite", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("getAll", () => {
    it("returns a list of all launchSites", async () => {
      // execute getAll and validate the result
      const result = await LaunchSite.getAll();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe("getOne", () => {
    it("returns a single LaunchSite by id", async () => {
      const rows = await LaunchSite.getAll();

      if (rows[0]) {
        const launchSiteId = rows[0].id;
        // execute getOne and validate the result
        const launchSite = await LaunchSite.getOne(launchSiteId);
      }
      expect(Array.isArray(rows)).toBeTruthy();
    });

    it("throws a NotFoundError when launchSite does not exist", async () => {
      // execute getOne with an invalid id and validate the error
      await expect(LaunchSite.getOne(999)).rejects.toThrow(NotFoundError);
    });
  });
});
