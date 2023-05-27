const db = require("../db");
const Mission = require("./mission");
const User = require("./user");
const { BadRequestError, NotFoundError } = require("../expressError");
const bcrypt = require("bcrypt");

describe("Mission", () => {
  beforeAll(async () => {
    // Remove any existing data from the tables
    await db.query("DELETE FROM missions");
    await db.query("DELETE FROM users");

    // Insert test data
    await db.query(`
      INSERT INTO users (id, username, first_name, last_name, age, email, phone, user_img_url, is_admin, password)
      VALUES 
        (1, 'user1', 'User', 'One', 30, 'user1@example.com', '123-456-7890', 'https://via.placeholder.com/150', false, '${await bcrypt.hash(
          "password1",
          1
        )}'),
        (2, 'user2', 'User', 'Two', 25, 'user2@example.com', '123-456-7891', 'https://via.placeholder.com/150', true, '${await bcrypt.hash(
          "password2",
          1
        )}');
    `);
  });
  afterAll(async () => {
    // Remove any existing data from the tables
    await db.query("DELETE FROM missions");
    await db.query("DELETE FROM users");

    // Disconnect from the test database
    await db.end();
  });

  // describe("createMission", () => {
  //   it("creates a new mission", async () => {
  //     // define the test data
  //     const user = await User.getAll();
  //     let userId = user[0].id;
  //     console.log(userId);
  //     const data = {
  //       missionName: "test_mission",
  //       launchDate: "2022-01-01",
  //       userId: userId,
  //       planetId: 1,
  //       commanderId: 1,
  //       captainId: 2,
  //       navigatorId: 3,
  //       spacecraftId: 1,
  //       launchSiteId: 1,
  //     };

  //     // call the createMission method and expect a new mission to be returned
  //     const result = await Mission.createMission(data);
  //     expect(result.missionName).toEqual("test_mission");
  //     expect(result.launchDate).toEqual("2022-01-01");
  //     expect(result.userId).toEqual(1);
  //     expect(result.planetId).toEqual(1);
  //     expect(result.commanderId).toEqual(1);
  //     expect(result.captainId).toEqual(2);
  //     expect(result.navigatorId).toEqual(3);
  //     expect(result.spacecraftId).toEqual(1);
  //     expect(result.launchSiteId).toEqual(1);
  //   });

  //   it("prevents duplicate mission names", async () => {
  //     // define the test data
  //     const data = {
  //       missionName: "test_mission",
  //       launchDate: "2022-01-01",
  //       userId: userId,
  //       planetId: 1,
  //       commanderId: 1,
  //       captainId: 2,
  //       navigatorId: 3,
  //       spacecraftId: 1,
  //       launchSiteId: 1,
  //     };
  //     // call the createMission method and expect a BadRequestError to be thrown
  //     await expect(Mission.createMission(data)).rejects.toThrow(
  //       BadRequestError
  //     );
  //   });
  // });

  describe("getAll", () => {
    it("gets all missions", async () => {
      // call the getAll method and expect an array of missions to be returned
      const result = await Mission.getAll();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe("getUserMissions", () => {
    it("gets all missions for a user", async () => {
      // call the getUserMissions method and expect an array of missions to be returned
      const result = await Mission.getUserMissions(1);
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  // describe("remove", () => {
  //   it("deletes a mission record when user is an admin", async () => {
  //     // initialize test data
  //     const testData = {
  //       missionName: "test_mission_to_remove",
  //       launchDate: "2022-01-01",
  //       userId: 11,
  //       planetId: 1,
  //       commanderId: 1,
  //       captainId: 2,
  //       navigatorId: 3,
  //       spacecraftId: 1,
  //       launchSiteId: 1,
  //     };

  //     // create a mission record before testing remove
  //     const mission = await Mission.createMission(testData);

  //     // execute remove with admin privileges and validate the result
  //     const result = await Mission.remove(mission.id, null, true);
  //     expect(result).toBeTruthy();
  //   });

  //   it("deletes a mission record when user is the owner", async () => {
  //     // initialize test data
  //     const testData = {
  //       missionName: "test_mission_to_remove",
  //       launchDate: "2022-01-01",
  //       userId: 11,
  //       planetId: 1,
  //       commanderId: 1,
  //       captainId: 2,
  //       navigatorId: 3,
  //       spacecraftId: 1,
  //       launchSiteId: 1,
  //     };

  //     // create a mission record before testing remove
  //     const mission = await Mission.createMission(testData);

  //     // execute remove with owner privileges and validate the result
  //     const result = await Mission.remove(mission.id, 1, false);
  //     expect(result).toBeTruthy();
  //   });

  //   it("throws a NotFoundError when mission record is not found", async () => {
  //     // execute remove with an invalid mission id and validate the result
  //     await expect(Mission.remove(999, 1, false)).rejects.toThrow(
  //       NotFoundError
  //     );
  //   });
  // });
});
