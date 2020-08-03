const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    diets: [{link: String, title: String, image: String}]
})

const User = mongoose.model('user', userSchema)

module.exports = User
