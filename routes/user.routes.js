const { Router } = require("express");
const userController = require("../controllers/user.controller");

// Variables
const router = Router();

// Routes
router.get("/", userController.getUsers);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

// Export router
module.exports = router;
