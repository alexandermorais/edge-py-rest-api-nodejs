const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Joi = require("@hapi/joi");

//  Validation for register user
const registerSchema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

// Validation for login user
const loginSchema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

// Signup user
router.post("/register", async (req, res) => {
    // Validation by Joi
    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Inputs
    nameInput = req.body.name;
    emailInput = req.body.email;
    passwordInput = req.body.password;

    // Verify if user email already exists
    const userEmailExist = await User.findOne({ email: emailInput });

    if (userEmailExist) {
        // Status: the email already exists
        return res.status(400).send("The entered email already exists.");
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordInput, salt);

    // New user
    const user = new User({
        name: nameInput,
        email: emailInput,
        password: hashedPassword,
    });

    try {
        // Add new user
        const saveUser = await user.save();
        // Status: new user created
        return res.status(200).send("User successfully created.");
    } catch (error) {
        // Status: error
        return res.status(500).send(error);
    }
});

// Login user
router.post("/login", async (req, res) => {
    // Validation by Joi
    const { error } = await loginSchema.validateAsync(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Inputs
    emailInput = req.body.email;
    passwordInput = req.body.password;

    // Token
    tokenFromEnv = process.env.TOKEN;

    // Verify if user email exists in database
    const user = await User.findOne({ email: emailInput });

    if (!user) {
        // Status: the email not exists
        return res.status(400).send("The email not exists.");
    }

    // Verify user password
    const verifyPassword = await bcrypt.compare(passwordInput, user.password);

    if (!verifyPassword) {
        // Status: incorrect password
        return res.status(400).send("Incorrect password. Try again, please.");
    }

    try {
        // Generate token
        const token = jwt.sign({ _id: user._id }, tokenFromEnv);
        res.header("auth-token", token).send(token);
    } catch (error) {
        // Status: error
        return res.status(500).send(error);
    }
});

module.exports = router;
