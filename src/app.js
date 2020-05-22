const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("connect-flash");


require("./db/mongoose");
require('./utils/passport')(passport);

//progressive
// const Window = require('window');
// const window = new Window();
// const navigator = window.navigator;

//socket///
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");

// app.use(expressLayouts)
app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(flash());

/***********************Skeleton*******************/

// PASSPORT configuration
app.use(
  require("express-session")({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//flash setting (global variable)
app.use(function (req, res, next){
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error = req.flash('error');
  next();
});

//ROUTE
app.use('/', require('./routes/users'))
app.use('/admin', require('./routes/admin'))

//socket route
io.on("connection", socket => {
  console.log("connected");
  socket.on("waitData", time => {
    console.log(`data: ${time}`);
    io.emit("waitData", time);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


//credit to add in footer
  /* <div>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
