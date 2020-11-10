//users = [];

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
//const { delete } = require('../routes/authroute');

async function insert(user){
// make a mogoose db call to save user ib db
    user.hashedPassword = bcrypt.hashSync(user.password,10);
    delete user.password;
    console.log('Saving User to DB',user);
    return await new User(user).save();

    // users.push(user);
    // return user
}

async function getUserByEmailIDAndPassword(email,password){
    let user = await User.findOne({email});
    
    if(isUserValid(user, password, hashedPassword)){
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    } 
    else{
        return null;
    }
}

async function isUserValid(user, password, hashedPassword){
    return user && bcrypt.compareSync(password,hashedPassword);
}

module.exports = { 
    insert,
    getUserByEmailIDAndPassword
     
};