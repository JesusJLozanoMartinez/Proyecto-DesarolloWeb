const { authenticate } = require('passport')
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email)
    
            if (user == null) {
                return done(null, false, {message: 'No user with that email'})
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect password'})
            }
        } catch (err) {
            return done(err, false, {message: 'Application error'})
        }
        
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize