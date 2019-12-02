const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const Admin = require('../models/admin')


//ADMIN route
//welcome admin route
router.get("/", (req, res) => {
  res.render("adminWelcome");
});

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let error = [];
  //Check required fields
  if (!name || !email || !passport) {
    error.push({ msg: "Please fill in all fields" });
  }

  //Check passwords match
  if (password !== password2) {
    error.push({ msg: "Passwords do not match" });
  }

  if (error.length > 0) {
    res.render("register", {
      error,
      name,
      email,
      password,
      password2
    });
  } else {
    // validation passed
    Admin.findOne({ email: email }).then(admin => {
      if (admin) {
        error.push({ msg: "Email is already registered" });
        res.render("register", {
          error,
          name,
          email,
          password,
          password2
        });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password
        });

        //hask password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;

            //Sert password to hashed
            newAdmin.password = hash;
            //Save admin
            newAdmin
              .save()
              .then(admin => {
                req.flash("success_msg", "You are registered");
                res.redirect("/admin/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

//login form
router.get("/login", (req, res) => {
  res.render("adminlogin");
});

//login logic
router.post(
  "/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })(req, res, next);
});

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admin/login");
});

module.exports = router