const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const User = require('./models/user')
const auth = require('./middleware/auth')

// Passport init
const initializePassport = require('./middleware/passport-config')
initializePassport(passport,
    async email => await User.findOne({email: email}),
    async (id) => await User.findOne({id: id})
)

// App init
const app = express()

// DB Connection
mongoose.connect('mongodb://localhost/final-proyect')
        .then(db => console.log('db connected'))
        .catch(err => console.log(err))

// App middlewares
app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: 'ui3yekjnfsd3rsdfsd',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Load routes
const loginRoutes = require('./routes/login')
app.use('/login', loginRoutes)

app.get('/', auth.authenticated, (req, res) => {
    res.render('index.ejs', {title: 'Auto Diet'})
})

app.post('/diets', (req, res) => {
    console.log(req.body)
})

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000...')
})