const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dietSchema = new Schema({
    title: String,
    image: String,
    link: String
})

const Diet = mongoose.model('diet', dietSchema)

module.exports = {Diet: Diet, dietSchema: dietSchema}
