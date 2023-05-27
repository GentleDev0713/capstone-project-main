const request = require("supertest");
const jwt = require("jsonwebtoken");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
  ensureAdmin,
} = require("./auth");

const { SECRET_KEY } = require("../config");

describe("authenticateJWT middleware", () => {
  test("should call next if no authorization header is present", () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeFalsy();
  });

  test("should set user in res.locals if authorization header is present", () => {
    const token = jwt.sign({ username: "testuser" }, SECRET_KEY);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { locals: {} };
    const next = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals.user.username).toEqual("testuser");
  });

  test("should call next if invalid token is provided", () => {
    const token = "invalid_token";
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authenticateJWT(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeFalsy();
  });
});

describe("ensureLoggedIn middleware", () => {
  test("should call next if user is set in res.locals", () => {
    const req = {};
    const res = { locals: { user: { username: "testuser" } } };
    const next = jest.fn();

    ensureLoggedIn(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should throw an error if user not set in res.locals", () => {
    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    expect(() => {
      ensureLoggedIn(req, res, next);
    });
  });
});

describe("ensureCorrectUserOrAdmin middleware", () => {
  test("should call next if user is admin", () => {
    const req = { params: { id: "1" } };
    const res = { locals: { user: { isAdmin: true } } };
    const next = jest.fn();

    ensureCorrectUserOrAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should call next if user is correct user", () => {
    const req = { params: { id: "1" } };
    const res = { locals: { user: { id: 1 } } };
    const next = jest.fn();

    ensureCorrectUserOrAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should throw an error if user is not admin or correct user", () => {
    const req = { params: { id: "1" } };
    const res = { locals: { user: { id: 2 } } };
    const next = jest.fn();

    expect(() => {
      ensureCorrectUserOrAdmin(req, res, next);
    });
  });
});

describe("ensureAdmin middleware", () => {
  test("should call next if user is admin", () => {
    const req = {};
    const res = { locals: { user: { isAdmin: true } } };
    const next = jest.fn();

    ensureAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should throw an error if user is not admin", () => {
    const req = {};
    const res = { locals: { user: { isAdmin: false } } };
    const next = jest.fn();

    expect(() => {
      ensureAdmin(req, res, next);
    });
  });

  test("should throw an error if user is not authenticated", () => {
    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    expect(() => {
      ensureAdmin(req, res, next);
    });
  });
});
