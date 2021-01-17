const express = require('express');
const authRoute = require('./authroute');
const orderRoute = require('./orderRoute');
const router = express.Router();

// localhost:4050/api/auth
router.use('/auth',authRoute);

// localhost:4050/api/order
router.use('/order',orderRoute);

// Exporting module
module.exports = router;