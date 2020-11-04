const mongoose = require("mongoose");
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const config = require('./config');

const mongoUri = config.mongo.uri;

// Establishing connection using connect().
mongoose.connect(mongoUri,{keepAlive: 1, useNewUrlParser: true,useUnifiedTopology: true});

// connection is an propety when connection establish to database.
const db = mongoose.connection;

// For showing Successfull connection.
db.once('open', () => {
   console.log(`Connected to the Database:${mongoUri}`); 
}); // .on('error', () => {
//     console.log(`Unable to connect to the database:${mongoUri}`);
//    });

// For showing Errors if not connected to database.
db.on('error', () => {
    console.log(`Unable to connect to the database:${mongoUri}`);
});

// Debugging Mode
if(config.mongo.isDebug){
    mongoose.set('debug',
    (CollectionName,method,query,doc) => {
      debug(`${CollectionName}.${method}`,
      util.inspect(query,false,20),doc);  
    });
}

// Exporting the Module
module.exports = db;


















