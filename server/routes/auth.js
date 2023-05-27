"use strict"
const router = require('express').Router();
const Auth = require('../models/auth');
const { createToken } = require("../helpers/tokens");
const jsonschema = require('jsonschema');
const authUserRegister = require('../schemas/authRegister.json');
const authUserLogin = require('../schemas/authLogin.json');
const { BadRequestError } = require('../expressError');

/* Routes to register a new user and to login/authenticate an existing user.*/

// Route to register a new user.  
router.post('/auth/register', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, authUserRegister);
        if (!validator) {
            const errs = validator.errs.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const data = req.body;
        const newUser = await Auth.register({ ...data, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    };
});

//Route to login an existing user.  
router.post('/auth/login', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, authUserLogin);
        if (!validator) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const data = req.body;
        const user = await Auth.authenticate(data)
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;