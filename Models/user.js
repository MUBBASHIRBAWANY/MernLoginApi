const mongoose = require('mongoose')

const userSchma = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profile: String,
    login: Boolean
})


const userModel = mongoose.model('user', userSchma)

module.exports = userModel