require('dotenv').config()

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const authRouter=require('./routes/auth')

const app = express();


app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//access
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true, // Allow cookies to be sent with the request
}));
app.options('*',cors());


const apiBase="/api"
app.use(apiBase,authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));