const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: null
    },
    password: { 
        type: String
    },
    token: {
        type: String
    }
})

module.exports = model('User', userSchema)