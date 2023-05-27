const request = require("supertest");
const jwt = require("jsonwebtoken");

const sendEmail = require("./mailing");
const { PartialSQLUpdate } = require("./sql");
const { createToken } = require("./tokens");

const { BadRequestError } = require("../expressError");
const { SECRET_KEY } = require("../config");

describe("createToken helper function", () => {
  const user = { id: 1, isAdmin: true };

  test("should create a token with correct payload", () => {
    const token = createToken(user);
    const decoded = jwt.verify(token, SECRET_KEY);

    expect(decoded.id).toBe(user.id);
    expect(decoded.isAdmin).toBe(true);
  });

  test("should create a token with isAdmin=false if not present", () => {
    const user = { id: 2 };
    const token = createToken(user);
    const decoded = jwt.verify(token, SECRET_KEY);

    expect(decoded.id).toBe(user.id);
    expect(decoded.isAdmin).toBe(false);
  });
});

describe("PartialSQLUpdate helper function", () => {
  const dataToUpdate = { name: "Alice", age: 30 };
  const jsToSql = { name: "name_field" };

  test("should return setCols and values properties", () => {
    const result = PartialSQLUpdate(dataToUpdate, jsToSql);

    expect(result.setCols).toEqual(`"name_field"=$1, "age"=$2`);
    expect(result.values).toEqual(["Alice", 30]);
  });

  test("should throw BadRequestError if no data to update", () => {
    const dataToUpdate = {};
    const jsToSql = {};

    expect(() => {
      PartialSQLUpdate(dataToUpdate, jsToSql);
    }).toThrowError(BadRequestError);
  });
});
