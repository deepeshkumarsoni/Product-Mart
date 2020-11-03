const express = require('express');
const userController = require('../controller/user.controller');
const asyncHandler = require('express-async-handler');

// Calling Router() from Express Module
const router = express.Router();

// Calling Asyn Function  (localhost:4050/api/auth/register)
router.post('/register',asyncHandler(insert));

async function insert(req,res,next){
    const user = req.body;
    console.log('Registering User',user);
    const savedUser = await userController.insert(user);
    res.json(savedUser);
}

// Exporting the module
module.exports = router;