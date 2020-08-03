module.exports = {
    authenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    },
    notAuthenticted: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        } 
        next()
    }
}