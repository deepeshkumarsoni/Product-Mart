const express = require('express');
const authRoute = require('./authroute');

const router = express.Router();

// localhost:4000/api/auth
router.use('/auth',authRoute);

// Exporting module
module.exports = router;