const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const moment = require('moment')

require('./db/mongoose');

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views');

const User = require('../src/models/user')

//setup handlebar
app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({extended: true}))

/***********************Skeleton*******************/

//ROUTE
app.get('', (req, res) => {
    res.render('landing')
})

//show all user route
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log('Error, cannot display customer list')
        } else {
            res.render('customerList', { 
                users: users, 
                moment: moment
            });
        }
    })
})

//show new form
app.get("/users/new", (req, res) => {
    res.render("new");
});

//create new user
app.post('/users/new', async(req, res) => {
    User.create(req.body.user, (err, newUser) => {
        if(err){
            res.render("new");
        } else {
            res.render("new-success");
        }
    })
})







app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

//credit to add in footer
{/* <div>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}