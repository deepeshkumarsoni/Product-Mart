const app = require("./configuration/express");
const config = require("./configuration/config");

// Intialize the MongoDB.
require('./configuration/mongoose');

// app listen at port 4000
app.listen(config.port, () => {
  console.log(`App is running on port no ${config.port} in ${config.env} mode.`);
});

/**
 * 
 
// Importing the express function from express module.
const express = require('express');
const path = require('path');

// Calling the express function which return an object.
const App = express();

// Creating PortNo. Dynamically.
const port = process.env.PORT || 4000;   // dotenv module using here 

// Creating the path to destination folder which we want to host.
const destinationDir = path.join(__dirname,'../dist'); 

// Hosting from dist folder.
App.use(express.static(destinationDir));
console.log(`Express Hosting from ${destinationDir}`);

// Serving index.html file
App.get('*',(req,res) => {
    res.sendFile(path.join(destinationDir,'index.html'));
});
console.log('Serving index.html');  

// Intialising our App and Listing on port.
App.listen(port,() => console.log(`Server is running on Portno.${port}`));

*/
