"use strict"
const router = require('express').Router();
const astronautsRoutes = require('./astronauts');
const authRoutes = require('./auth');
const launchSitesRoutes = require('./launchSites');
const missionsRoutes = require('./missions')
const planetsRoutes = require('./planets');
const spacecraftRoutes = require('./spacecraft');
const usersRoutes = require('./users');

router.use(astronautsRoutes)
router.use(authRoutes);
router.use(launchSitesRoutes);
router.use(missionsRoutes);
router.use(planetsRoutes);
router.use(spacecraftRoutes);
router.use(usersRoutes);

module.exports = router;