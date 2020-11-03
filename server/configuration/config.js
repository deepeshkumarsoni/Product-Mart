require("dotenv").config();
const envVars = process.env;
module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  mongo: {
    url: envVars.MONGODB_URL,
    port: envVars.MONGO_PORT,
    isDebug: envVars.MONGOOSE_DEBUG
  }  
};
