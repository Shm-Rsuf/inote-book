const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Rsufisagoodb$oy'

//ROUTE1: Create a User using: POST '/api/auth/user'. No login required
router.post('/user', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    //If there are errors, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({success, errors: errors.array() });
    }

    try {
        //Check whether the user with the email already exists
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({success, error: 'This email already exists' })
        }
        //For creating hash password with salt
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Create a New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        //For creating jwtToken
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE2: Authenticate a User using: POST '/api/auth/login'. No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false
    //If there are errors, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(404).json({ success, error: 'login invalid' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(404).json({ success, error: 'login invalid' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE3: GET Logged in User Details Using: POST '/api/auth/getuser'. Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router