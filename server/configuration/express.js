const express = require("express");
const path = require("path");
const config = require("./config");
const logger = require("morgan");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("../routes");
const passport = require("../middleware/passport");

// Get the app
const app = express();

// Logger
if (config.env === "development") {
  app.use(logger("dev"));
}

// Getting 'dist' folder path
const disDir = path.join(__dirname, "../../dist");

// Use 'dist' folder as hosting folder by express
app.use(express.static(disDir));

// Parsing from API
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Secure apps HTTP
app.use(helmet());

// Allow CORS
app.use(cors());

// Authenticate Jwt Using Password
app.use(passport.initialize());

// API Router localhost:4050/api
app.use("/api/", routes);

// Serve the index.html
app.get("*", (req, res) => res.sendFile(path.join(disDir, "index.html")));

// Exporting the module
module.exports = app;