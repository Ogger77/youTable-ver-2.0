const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const methodOverride = require('method-override')

require('./db/mongoose');

const User = require('../src/models/user')
const sendsms = require('../src/utils/sms')


//socket///
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views');


//setup handlebar
app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));

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

//send SMS route
app.get('/users/:id', async (req,res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err){
            res.redirect('/users')
        }else {
            try{
                sendsms(foundUser.phone, foundUser.name, foundUser.number)
            }catch(e){
                console.log(e)
            }
            
            res.render('new-success', {
                user: foundUser
            })
        } 
    })
})

//delete route
app.delete('/users/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('/users')
        }
    })
})



io.on('connection', (socket) => {
    console.log('connected')
    socket.on('waitData', (time) => {
        console.log(`data: ${time}`)
        io.emit('waitData', time)
    })
})


server.listen(port, () => {
    console.log(`Server is running on ${port}`)
 
})

//credit to add in footer
{/* <div>Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}