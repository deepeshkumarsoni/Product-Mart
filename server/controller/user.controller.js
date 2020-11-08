//users = [];

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

async function insert(user){
// make a mogoose db call to save user ib db
    user.hashedPassword = bcrypt.hashSync(user.password,10);
    delete user.password;
    console.log('Saving User to DB',user);
    return await new User(user).save();

    // users.push(user);
    // return user
}

module.exports = { 
    insert 
};