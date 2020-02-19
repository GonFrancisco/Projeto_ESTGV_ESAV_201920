
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

// Serialize User
passport.serializeUser(function(user, callback){
    callback(null, user.id);
});

// Deserialize User
passport.deserializeUser(function(id, callback){
    Utilizador.findOne({id}).exec(function(err, user){
        callback(err, user);
    });
});

//Local Strat
var verifyHandler = function(req ,mail, pw, done) {
    process.nextTick(function() {
        Utilizador.findOne({mail: mail}).exec(function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, { message: 'Incorrect username.' });
            bcrypt.compare(pw, user.hashpw, function(err, res){
                if(!res) return done(null, false, { message: 'Incorrect password.' });
                return done(null, user);
            })
        });
    });
  };
   
  //Register the LocalStrategywith Passport.
  passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'pw',
    passReqToCallback: true
   
  }, verifyHandler));