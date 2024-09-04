const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fetchUser = require('../middleware/fetchUser');

dotenv.config();

const JWT_RELATED = process.env.JWT_REAL; //----------------> JWT_SECRET


// =================================>  SIGN-UP EndPoint Starting <=====================================

// Create a User  using: POST "/api/auth/createUser" . Doesn't require Authentication
router.post('/createUser', [
    body('name', "Name must be at Least 3 characters").isLength({ min: 3 }),//----------|
    body('email', "Please Enter a Valid Email!").isEmail(),                     //      |-----> This Use For Validation
    body('password', "Password must be at Least 8  characters").isLength({ min: 8 }),//-|
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) { //----------------------> Checking if error found user cannot  be created
        return res.status(400).json({ errors: result.array() }); // --> if error found message send
    }



    try {
        const { name, email, password } = req.body;// ------------> Destructuring data from req.body for easiness access
        const salt = await brcrypt.genSalt(10); // ------>  Generating a salt 
        const securePassword = await brcrypt.hash(password, salt); // --> Hashing the password

        let user = await User.findOne({ email: email }); // ------> Checking if user already exist in database
        if (user) {
            return res.status(400).json({ error: "Email already exist!" });
        }
        user = await User.create({   //---|
            name: name, //                |
            email: email,   //            |------> Creating New User from the Help of User.js (Schema)
            password: securePassword// ---|
        })

        const data = { //----------> Creating for sending in Token for Authentication 
            user: {
                id: user.id, //----------------->  Sending User ID in Token Because Id is Fastest Accessible
            }
        }

        const authToken = jwt.sign(data, JWT_RELATED); //------------------->  Creating Token for Authentication 
        success = true;
        res.json({success,authToken}) //---------------------->  Sending Token in Response

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// =================================>  SIGN-UP EndPoint Ending <=====================================


// ==============================>  SIGN-IN OR LOGIN EndPoint Starting <================================

// Create a User  using: POST "/api/auth/login" . Doesn't require Authentication
router.post('/login', [
    body('email', "Please Enter a Valid Email!").isEmail(),  //    |-----> This Use For Validation
    body('password', "Password Cannot be Blank!").exists(),
], async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) { //----------------------> Checking if error found user Cannot be Login
        return res.status(400).json({ errors: result.array() }); // --> if error found message send
    }

    try {

        const { email, password } = req.body;// ------------> Destructuring data from req.body for easiness access

        let user = await User.findOne({ email }); // ------> Checking if user Email exist or not in database
        if (!user) {
            return res.status(400).json({ error: "Please Try to Login with Correct Credentials!" });
        }

        const comparePassword = await brcrypt.compare(password, user.password); // ------> Checking if user password Correct or not
        if (!comparePassword) {
            return res.status(400).json({ error: "Please Try to Login with Correct Credentials!" });
        }

        const data = { //----------> Creating for sending in Token for Authentication 
            user: {
                id: user.id, //----------------->  Sending User ID in Token Because Id is Fastest Accessible
            }
        }

        const authToken = jwt.sign(data, JWT_RELATED); //------------------->  Creating Token for Authentication 
        success = true;
        res.json({success, authToken}) //---------------------->  Sending Token in Response

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// ==============================>  SIGN-IN OR LOGIN EndPoint Ending <================================


// ==============================>  GET LOGINNED USER Detail EndPoint Starting <==============================

// Getting Loginned User Detail using: POST "/api/auth/getUser" .  required Authentication
router.post('/getUser', fetchUser, async (req, res) => { //----------->   Using FetchUser Middleware for Authentication

    try {
        
        const userID = req.user.id; 
        const user  = await User.findById(userID).select("-password"); //----->   Getting User Detail from Database using ID and Selecting all fields except password
        res.send(user); //---------------------->  Sending Token in Response

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// ==============================>  GET LOGINNED USER Detail EndPoint Ending <================================


// ************* This Below Line is Must Important (module.exports) use for function export  *************
module.exports = router;
