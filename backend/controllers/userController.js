const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')



// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fname, email, phonenumber, town, password } = req.body

    // Input chacker for the required input
    if (!fname) {
        res.status(400)
        throw new Error('please add your first name')
    } else if (!email) {
        res.status(400)
        throw new Error('please add your email')
    }
    // else if (!phonenumber) {
    //     res.status(400)
    //     throw new Error('please add your phone number')
    // }
    else if (!town) {
        res.status(400)
        throw new Error('please add your town')
    } else if (!password) {
        res.status(400)
        throw new Error('please add your password')
    }

    //check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name: {
            fname: req.body.fname,
            lname: req.body.lname,
        },
        contacts: {
            email: req.body.email,
            phonenumber: req.body.phonenumber,
        },
        location: {
            town: req.body.town,
            street: req.body.street,
            estate: req.body.estate,
            country: req.body.country,
        },
        password: hashedPassword
    })

    //user checker
    if (user) {
        res.status(201).json({
            _id: user.id,
            fname: user.name.fname,
            lname: user.name.lname,
            email: user.contacts.email,
            phonenumber: user.contacts.phonenumber,
            town: user.location.town,
            street: user.location.street,
            estate: user.location.estate,
            country: user.location.country,
            password: user.password,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})




// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            fname: user.name.fname,
            lname: user.name.lname,
            email: user.contacts.email,
            phonenumber: user.contacts.phonenumber,
            town: user.location.town,
            street: user.location.street,
            estate: user.location.estate,
            country: user.location.country,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})





// @desc Get user data
// @route POST /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, fname, lname, email, phonenumber, town, street, estate, country, password } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        fname: fname,
        lname,
        email,
        phonenumber,
        town,
        street,
        estate,
        country,
        password,
    })
})


// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
}