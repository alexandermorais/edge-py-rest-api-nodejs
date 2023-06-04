// Model of user
const User = require("./../models/User");

// BCryptJS for encryption
const bcrypt = require("bcryptjs");

// Validations
const Joi = require("@hapi/joi");

//  Validation for update user
const updateSchema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

//  Validation for delete user
const deleteSchema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
});

// Method getUsers
const getUsers = async (req, res) => {
    try {
        // Get users
        const users = await User.find();

        // Return users
        return res.json(users);
    } catch (error) {
        // Status: error
        return res.status(500).send(error);
    }
};

// Method updateUser
const updateUser = async (req, res) => {
    // Validation by Joi
    const { error } = await updateSchema.validateAsync(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Inputs
    nameInput = req.body.name;
    emailInput = req.body.email;
    passwordInput = req.body.password;

    // Verify if email exists in the database
    const user = await User.findOne({ email: emailInput });

    if (!user) {
        // Status: the email not exists
        return res.status(400).send("The user (email entered) not exists.");
    } else {
        // Verify user password
        const verifyPassword = await bcrypt.compare(
            passwordInput,
            user.password
        );
        if (!verifyPassword) {
            // Status: incorrect password
            return res
                .status(400)
                .send("Incorrect password. Try again, please.");
        }
    }

    try {
        // Update user
        await User.updateOne({ _id: user._id }, { $set: { name: nameInput } });

        // Status: user updated
        return res.status(200).send("User updated successfully.");
    } catch (error) {
        // Status: error
        return res.status(500).send(error);
    }
};

// Method deleteUser
const deleteUser = async (req, res) => {
    // Validation by Joi
    const { error } = await deleteSchema.validateAsync(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Inputs
    emailInput = req.body.email;
    passwordInput = req.body.password;

    // Verify if email exists in the database
    const user = await User.findOne({ email: emailInput });

    if (!user) {
        // Status: the email not exists
        return res.status(400).send("The user (email entered) not exists.");
    } else {
        // Verify user password
        const verifyPassword = await bcrypt.compare(
            passwordInput,
            user.password
        );
        if (!verifyPassword) {
            // Status: incorrect password
            return res
                .status(400)
                .send("Incorrect password. Try again, please.");
        }
    }

    try {
        // Update user
        await User.deleteOne({ _id: user._id });

        // Status: user deleted
        return res.status(200).send("User deleted successfully.");
    } catch (error) {
        // Status: error
        return res.status(500).send(error);
    }
};

// Export the functions as methods of controller
module.exports = {
    getUsers,
    updateUser,
    deleteUser,
};
