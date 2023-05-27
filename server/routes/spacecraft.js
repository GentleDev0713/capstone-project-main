"use strict"
const router = require('express').Router();
const Spacecraft = require('../models/spacecraft');

/* 'Routes to GET all records or GET one record  from spacecraft table. */
router.get('/spacecraft', async (req, res, next) => {
    try {
        const spacecraft = await Spacecraft.getAll();
        return res.json({ spacecraft });
    } catch (err) {
        return next(err);
    };
});

// Return one record on spacecraft table based on ID.
router.get('/spacecraft/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const spacecraft = await Spacecraft.getOne(id);
        return res.json({ spacecraft });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;