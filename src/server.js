const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const User = require('./models/user')
const auth = require('./middleware/auth')

const initializePassport = require('./middleware/passport-config')
initializePassport(passport,
    async email => await User.findOne({email: email}),
    async (id) => {
        // TODO: verifica que sí llegue el user
        console.log(id)
        const user = await User.findOne({id: id})
        console.log(user)
        return user 
    }
)

const app = express()

mongoose.connect('mongodb://localhost/final-proyect')
        .then(db => console.log('db connected'))
        .catch(err => console.log(err))

app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: 'ui3yekjnfsd3rsdfsd',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const loginRoutes = require('./routes/login')
const { init } = require('./models/user')

app.get('/', auth.authenticated, (req, res) => {
    res.render('index.ejs', {title: 'Auto Diet'})
})

app.use('/login', loginRoutes)
app.listen(3000);