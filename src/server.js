const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const User = require('./models/user')
const { Diet } = require('./models/diet')
const auth = require('./middleware/auth')

// Passport init
const initializePassport = require('./middleware/passport-config')
initializePassport(passport,
    async email => await User.findOne({email: email}),
    async id => await User.findOne({_id: id})
)

// App init
const app = express()

// DB Connection
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/final-proyect')
        .then(db => console.log('db connected'))
        .catch(err => console.log(err))

// App middlewares
app.set('port', process.env.PORT || 3000);
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
const { json } = require('express')
const { use } = require('passport')
app.use('/login', loginRoutes)

app.get('/', auth.authenticated, (req, res) => {
    res.render('index.ejs', {title: 'Auto Diet'})
})

app.get('/help', auth.authenticated, (req, res) => {
    res.render('gethelp.ejs', {title: 'Get Help'})
})

app.get('/pastdiets', auth.authenticated, async (req, res) => {
    const user = await req.user
    res.render('diet.ejs', {title: 'Past Diets', diets: user.diets})
})

app.post('/pastdiets', auth.authenticated, async (req, res) => {
    const {label, image, link} = req.body
    const user = await req.user

    await User.findOneAndUpdate(
        {email: user.email},
        {$push: {"diets": {title: label, image: image, link: link}}},
        function(err, user) {
            if (err) {
                console.log(err)
                return res.json({error: err, message: 'Can\'t save diet'})
            }
            res.status(201)
        }
    )
})

// Start server
app.listen(app.get('port'), () =>{
    console.log('server running on port' + app.get('port'));
});