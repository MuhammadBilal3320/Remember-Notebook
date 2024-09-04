const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const fetchUser = (req, res, next) => {
    // Get the user from the JWT Token and Add id to request object

    const token = req.header('auth-token') // ------>  This is the token from the client side

    if (!token) {
        res.status(401).send({ error: "Please Authenticate using a Valid Token!" })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_REAL);  // ------>   This is the secret key from the server side
        req.user = verified.user;  // ------>  This is the user object/Data from the JWT Token
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a Valid Token!" })
    }
}

module.exports = fetchUser;