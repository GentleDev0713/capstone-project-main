const request = require("supertest");
const db = require("../db");
const User = require("./user");
const { NotFoundError, BadRequestError } = require("../expressError");
const bcrypt = require("bcrypt");

describe("User class", () => {
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

  describe("getAll method", () => {
    test("should return all users", async () => {
      const users = await User.getAll();

      expect(users).toHaveLength(2);
      expect(users[0].id).toBe(2);
      expect(users[0].username).toBe("user2");
    });

    test("should throw an error if not admin", async () => {
      const users = await User.getAll();
      expect(users).toHaveLength(2);
      try {
        const user = { isAdmin: false };
        await User.getAll();
      } catch (err) {
        expect(err.message).toBe("Unauthorized");
      }
    });
  });

  describe("getOne method", () => {
    test("should return a single user by ID", async () => {
      const user = await User.getOne(1);

      expect(user).toHaveProperty("id", 1);
      expect(user).toHaveProperty("username", "user1");
      expect(user).toHaveProperty("firstName", "User");
      expect(user).toHaveProperty("lastName", "One");
      expect(user).toHaveProperty("age", 30);
      expect(user).toHaveProperty("email", "user1@example.com");
      expect(user).toHaveProperty("phone", "123-456-7890");
      expect(user).toHaveProperty("userImg", "https://via.placeholder.com/150");
      expect(user).toHaveProperty("isAdmin", false);
      expect(user).not.toHaveProperty("password");
      expect(user).toHaveProperty("missionCount", "0");
    });

    test("should throw a NotFoundError for a non-existent user", async () => {
      try {
        await User.getOne(100);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundError);
      }
    });

    test("should throw an error if not current user or admin", async () => {
      try {
        await User.getOne(2, { id: 1 });
      } catch (err) {
        expect(err.message).toBe("Unauthorized");
      }
    });
  });

  describe("remove method", () => {
    test("should delete a user by ID", async () => {
      await User.remove(1);
      const users = await User.getAll();

      expect(users).toHaveLength(1);
      expect(users[0].id).toBe(2);
      expect(users[0].username).toBe("user2");
    });
  });

  describe("update method", () => {
    test("should update a user by ID", async () => {
      const data = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        isAdmin: true,
      };
      const user = await User.update(2, data);

      expect(user).toHaveProperty("id", 2);
      expect(user).toHaveProperty("firstName", "Jane");
      expect(user).toHaveProperty("lastName", "Doe");
      expect(user).toHaveProperty("email", "jane.doe@example.com");
      expect(user).toHaveProperty("isAdmin", true);
      expect(user).not.toHaveProperty("password");
    });

    test("should throw a NotFoundError for a non-existent user", async () => {
      try {
        await User.update(100, {});
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestError);
      }
    });
  });
});
