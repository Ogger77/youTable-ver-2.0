const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
      //Match Admin
      Admin.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "Email is not registered" });
        }

        //Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      });
    })
  );



  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });
};

