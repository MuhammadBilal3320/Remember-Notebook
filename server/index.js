const connectToMongo = require('./db')
const express = require('express');
const dotenv = require('dotenv');
const auth = require('./routes/auth')
const notes  = require('./routes/notes')
var cors = require('cors')

dotenv.config();
const app = express();
const port = 8000;

app.use(cors())
app.use(express.json()) //============> We must use middleware for req.body

connectToMongo();


// ----------------- Routes Start -----------------------

app.use('/api/auth',  auth);
app.use('/api/notes', notes);


// ----------------- Routes End -----------------------


app.listen(port, (req, res)=>{
    console.log("Server Listened Successfully!")
})