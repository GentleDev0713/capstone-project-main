"use strict"
const router = require('express').Router();
const Mission = require('../models/mission');
const jsonschema = require('jsonschema');
const missionNewSchema = require('../schemas/missionNew.json')
const { BadRequestError } = require('../expressError');
const { ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");

/* GET, POST, PATCH, and DELETE routes for missions table. */

//Route to create a new mission.  
router.post('/missions/new', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, missionNewSchema);
        if (!validator) {
            const errs = validator.errs.map(e => e.stack);
            throw new BadRequestError(errs);
        };
        const data = req.body;
        const job = await Mission.createMission(data);
        return res.status(201).json({ job });
    } catch (err) {
        return next(err);
    };
});

// Route to return all records on missions table.
router.get('/missions', ensureAdmin, async (req, res, next) => {
    try {
        const missions = await Mission.getAll();
        return res.json({ missions });
    } catch (err) {
        return next(err);
    };
});

// Route all missions for one user based on user ID */
router.get('/missions/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        const missions = await Mission.getUserMissions(id);
        return res.json({ missions });
    } catch (err) {
        return next(err);
    };
});

/* Route to delete a record on missions table based on mission id. */
router.delete('/missions/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        const userId = res.locals.user.id;
        const id = req.params.id;
        const isAdmin = res.locals.user.isAdmin;

        await Mission.remove(id, userId, isAdmin);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;