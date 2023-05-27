"use strict"
const router = require('express').Router();
const LaunchSite = require('../models/launchSite');

/* 'Routes to GET all records or GET one record  from launch_sites table. */

// Return all records on launch_sites table.
router.get('/launchsites', async (req, res, next) => {
    try {
        const launchSites = await LaunchSite.getAll();
        return res.json({ launchSites });
    } catch (err) {
        return next(err);
    };
});

//Return the record of one launchsite based on ID.
router.get('/launchsites/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const launchSite = await LaunchSite.getOne(id);
        return res.json({ launchSite });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;