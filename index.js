// Import Express.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Middleware for verify auth
const authVerify = require("./routes/auth/authVerify");

// Imported routes
const authRoute = require("./routes/auth/auth");
const userRoutes = require("./routes/user.routes");

// Environment variables
const port = process.env.PORT || 3000;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

// This application listen to the port
app.listen(port, () =>
    console.log(`Server running on port "${port}" is sucessful.`)
);

// Middleware: allow access JSON-JavaScript object and allow Cross-Origin Resource Sharing (CORS).
app.use(express.json(), cors());

//Database connection
const uri = `mongodb://0.0.0.0:${dbPort}/${dbName}`;

mongoose
    .connect(uri)
    .then(() => {
        console.log(`Connection to the database "${dbName}" is successful.`);
    })
    .catch((error) => console.log("Connection to the database error: ", error));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/", (req, res) => {
    res.send("Working!");
});
app.use("/api/users", authRoute);
app.use("/api/users/private", authVerify, userRoutes);
