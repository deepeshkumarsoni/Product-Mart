users = [];

async function insert(user){
// make a mogoose db call to save user ib db
    console.log('Saving User to DB',user);
    users.push(user);
    return user
}

module.exports = { insert };