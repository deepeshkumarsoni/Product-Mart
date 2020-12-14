const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; 

const config = require('../configuration/config');
const userController = require('../controller/user.controller');

const localStrategy = new LocalStrategy(
  { 
    usernameField : 'email',
    passwordField : 'password'
  },
    async (email,password,done) => {
      const user = await userController.getUserByEmailIDAndPassword(email,password);
      return user? 
      done(null,user) 
      : done(null,false,{
          error: "Your Login Details Are Not Valid.Please Try Again."
        });
    }
);

const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
        secretOrKey : config.jwtSecret
    },
    async (payload,done)=> {
        const user = await userController.getUserById(payload._id);
        return user?
        done(null,user)
        :done(null,false,{
            error: "Your Login Details Are Not Valid.Please Try Again."
        });
    }
);

module.exports = passport.use(localStrategy).use(jwtLogin);
