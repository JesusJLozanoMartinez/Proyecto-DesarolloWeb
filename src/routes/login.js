const express = require('express')
const { render } = require('ejs')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth.notAuthenticted, (req, res) => {
    res.render('./login/login.ejs', {title: 'Login'})
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', auth.notAuthenticted, (req, res) => {
    res.render('./login/register.ejs', {title: 'Register'})
})

router.post('/register', async (req, res) => {
    console.log('register post')
    const { name, email, password } = req.body
    const foundUser = await User.findOne({ email: email })
    if (foundUser) { 
        return res.status(403).json({message: 'Email already in use'})
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword })
        await user.save()
        console.log("here")
        passport.authenticate('local')(req, res, () => {
            res.redirect('/')
        })
    } catch(err) {
        res.status(500).json({error: err, message: 'Couldn\'t register user'})
    }
})

module.exports = router