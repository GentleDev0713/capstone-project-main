"use strict"
const router = require('express').Router();
const User = require('../models/user');
const Auth = require('../models/auth');
const jsonschema = require('jsonschema');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');
const contactFormSchema = require('../schemas/contactForm.json');
const { BadRequestError } = require('../expressError');
const sendEmail = require('../helpers/mailing')
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");

/* GET, POST, PATCH, and DELETE routes for users. 
The route to register a new user is at /routes/auth*/

// GET all records on users table.
router.get('/users', ensureAdmin, async (req, res, next) => {
    console.log('REQ-BODY-ROUTE:', req.body)
    try {
        const users = await User.getAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    };
});

// GET one record on users table based on ID.
router.get('/users/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {

    try {
        const id = req.params.id;
        const user = await User.getOne(id);

        return res.json({ user });
    } catch (err) {
        return next(err);
    };
});

//POST a new user.  This is for an admin to create a new user.  It is not for a non-admin to create a new user.  It uses the same register() static method on the Auth class.  
router.post('/users/new', ensureAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator) {
            const errs = validator.errs.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const data = req.body;
        const newUser = await Auth.register(data);
        return res.json({ newUser });
    } catch (err) {
        return next(err);
    };
});

/* Route to handle contact form submissions from client.*/
router.post('/contact', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, contactFormSchema);
        if (validator.errors.length > 0) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const info = await sendEmail(req.body.email)
        return res.json({ message: "Email was sent successfuly." });
    } catch (err) {
        return next(err);
    };
});

/* Route to update one user based on ID */
router.patch('/users/:id', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (validator.errors.length > 0) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const id = req.params.id;
        const user = await User.update(id, req.body);
        return res.json({ user })
    } catch (err) {
        return next(err);
    };
});

//DELETE one user based on user ID.
router.delete('/users/:id', ensureAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.remove(id);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
        return next(err);
    };
});

module.exports = router;