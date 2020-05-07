const express = require("express");
const router = express.Router();
const moment = require('moment')
const { ensureAuthenticated } = require('../utils/auth')

const sendsms = require('../utils/sms')
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("landing");
});

//CUSTOMER ROUTE
//show all user route
router.get("/users", ensureAuthenticated, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log("Error, cannot display customer list");
    } else {
      res.render("customerList", {
        users: users,
        moment: moment
      });
    }
  });
});

//show new form
router.get("/users/new", (req, res) => {
  res.render("new");
});

//create new user
router.post("/users/new", (req, res) => {
  User.create(req.body.user, (err, newUser) => {
    if (err) {
      res.render("new");
    } else {
      res.render("new-success");
    }
  });
});

//send SMS route
router.post("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      res.redirect("/users");
    } else {
      try {
        sendsms(foundUser.phone, foundUser.name, foundUser.number);
      } catch (e) {
        console.log(e);
      }
      //popup message send

    }
  });
});

//delete route
router.delete("/users/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/users");
    }
  });
});

module.exports = router