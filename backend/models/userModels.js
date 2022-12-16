const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        fname: { type: String, required: [true, 'please add your first name'] },
        lname: { type: String },
    },
    contacts: {
        email: { type: String, require: [true, 'please add your email address'], unique: true },
        phonenumber: { type: String },
    },
    location: {
        town: { type: String, require: [true, 'please add the town'] },
        street: { type: String },
        estate: { type: String },
        country: { type: String },
    },
    password: { type: String, required: [true, 'please add a password'] },
},
    {
        timestamp: true
    }
)


module.exports = mongoose.model('User', userSchema)