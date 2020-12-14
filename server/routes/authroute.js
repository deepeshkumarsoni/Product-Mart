const express = require('express');

const userController = require('../controller/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controller/authControler');
const passport = require('passport');

// Calling Router() from Express Module
const router = express.Router();

// Calling Asyn Function  (localhost:4050/api/auth/register)
router.post('/register',asyncHandler(insert),login);
router.post('/login',passport.authenticate('local',{session:false}),login);
router.get('/findme',passport.authenticate('jwt',{session:false}),login);

router.get('/deepesh',function(){
    const x = 5;
    const y = 6;
    result = x+y;
    console.log('deepesh');
    return "hii";
})

async function insert(req,res,next){
    const user = req.body;
    console.log('Registering User',user);
    req.user = await userController.insert(user);
   // res.json(savedUser);
   next();
}

function login(req,res){
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    });
}    

// Exporting the module
module.exports = router;