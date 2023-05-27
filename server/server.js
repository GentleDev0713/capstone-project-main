"use strict";

/* Server configuration */

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
    console.log(`Stellar Travel server running on http://localhost:${PORT}`);
});