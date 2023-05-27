const request = require("supertest");
const db = require("../db");
const Auth = require("../models/auth");
const { BadRequestError, UnauthorizedError } = require("../expressError");

describe("Auth", () => {
  afterAll(async () => {
    // disconnect from the database after running the tests
    await db.end();
  });

  describe("POST /auth/register", () => {
    it("registers a new user", async () => {
      // define the test data
      const data = {
        username: "testuser1",
        password: "test_password",
        firstName: "Test",
        lastName: "User",
        age: 30,
        email: "test_user@example.com",
        phone: "1234567890",
        imgUrl: "https://example.com/test_user.png",
        isAdmin: false,
      };

      // call the register method and expect a new user to be returned
      const result = await Auth.register(data);
      expect(result.username).toEqual("testuser1");
      expect(result.firstName).toEqual("Test");
      expect(result.lastName).toEqual("User");
      expect(result.age).toEqual(30);
      expect(result.email).toEqual("test_user@example.com");
      expect(result.phone).toEqual("1234567890");
      expect(result.userImg).toEqual("https://example.com/test_user.png");
      expect(result.isAdmin).toEqual(false);
    });

    it("prevents duplicate usernames", async () => {
      // define the test data
      const data = {
        username: "testuser",
        password: "test_password",
        firstName: "Test",
        lastName: "User",
        age: 30,
        email: "test_user@example.com",
        phone: "1234567890",
        imgUrl: "https://example.com/test_user.png",
        isAdmin: false,
      };
    });
  });

  describe("POST /auth/login", () => {
    it("authenticates a user with valid credentials", async () => {
      // define the test data
      const data = {
        username: "testuser1",
        password: "test_password",
      };

      // call the authenticate method and expect the user to be returned
      const result = await Auth.authenticate(data);
      expect(result.username).toEqual("testuser1");
      expect(result.firstName).toEqual("Test");
      expect(result.lastName).toEqual("User");
      expect(result.age).toEqual(30);
      expect(result.email).toEqual("test_user@example.com");
      expect(result.phone).toEqual("1234567890");
      expect(result.userImg).toEqual("https://example.com/test_user.png");
      expect(result.isAdmin).toEqual(false);
    });

    it("throws an error with invalid username", async () => {
      // define the test data
      const data = {
        username: "nonexistent_user",
        password: "test_password",
      };

      // call the authenticate method and expect a UnauthorizedError to be thrown
      await expect(Auth.authenticate(data)).rejects.toThrow(UnauthorizedError);
    });

    it("throws an error with invalid password", async () => {
      // define the test data
      const data = {
        username: "test_user",
        password: "wrong_password",
      };

      // call the authenticate method and expect a UnauthorizedError to be thrown
      await expect(Auth.authenticate(data)).rejects.toThrow(UnauthorizedError);
    });
  });
});
