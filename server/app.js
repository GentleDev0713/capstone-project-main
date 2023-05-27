"user strict";
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const path = require("path");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);
app.use("/api", routes);

// Enable when deploying on Heroku
app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
  }
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
