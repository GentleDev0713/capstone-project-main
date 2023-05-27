"use strict"
const router = require("express").Router();
const Astronaut = require('../models/astronaut');

/* Routes to GET all records or GET one record on astronauts table. */

// Return all records on astronauts table.
router.get("/astronauts", async (req, res, next) => {
    try {
        const astronauts = await Astronaut.getAll();
        return res.json({ astronauts });
    } catch (err) {
        return next(err);
    };
});

//Return the record of one astornaut based on ID.
router.get('/astronauts/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const astronaut = await Astronaut.getOne(id)
        return res.json({ astronaut });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;