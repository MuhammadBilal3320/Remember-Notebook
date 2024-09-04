const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
    
    mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully!")
}

// **** We use The Module.Export For  Exporting The Function So That We Can Use It In Other Files ******
module.exports = connectToMongo;