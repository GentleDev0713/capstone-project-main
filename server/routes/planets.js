"use strict"
const router = require('express').Router();
const Planet = require('../models/planet');

/* 'Routes to GET all records or GET one record  from planets table. */

//Return all records on planets table.
router.get('/planets', async (req, res, next) => {
    try {
        const planets = await Planet.getAll();
        return res.json({ planets });
    } catch (err) {
        return next(err);
    };
});

//Return one record on planets table based on id.
router.get('/planets/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const planet = await Planet.getOne(id);
        if (!planet) throw new NotFoundError(`Planet with id of ${id} not found.`);
        return res.json({ planet });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;