const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    verificationLink: {type: String},
    isActivated: {type: Boolean, default: false},
    img: {type: String, default: ''}
})

module.exports = model('User', User)