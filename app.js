//basic import
const express = require('express');
const userRoute = require('./src/routes/route');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//security middleware import
const cors = require("cors");
const helmet = require("helmet");
const MongoSanitize = require("express-mongo-sanitize");
const reteLimit = require('express-rate-limit')
require('dotenv').config();
app.use("/v1", userRoute)

//security middleware implementation

app.use(cors());
app.use(helmet());
app.use(MongoSanitize())




//ratelimit 
const limiter = reteLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayMs: 0,
  max: 100, // limit each IP to 10 requests per windowMs
});



//mongoose import
const mongoose = require("mongoose");


//DB Connection
mongoose.set('strictQuery', true);

const URI = process.env.DB_URL; 
const OPTION = {
	user: "",
	pass: "",
	autoIndex: true
}

mongoose.connect(URI, OPTION)
.then(()=> console.log("db is connected"))
.catch((error)=>{
	console.log("db is not connected");
	console.log(error);
	process.exit(1);
})

//unknown routes
app.use((req, res, next) => {
	res.status(404).json({
		status: false,
		message: "Not Found"
	})
})


//error handler
app.use((err,req, res, next) => {
	if (err) {
		res.status(401).json({
			status: false,
			err: err.message,
            message: "something Broke"
		})
	}
	else{
		res.status(401).json({
			status: false,
			message: "Something broke"
		})
	}
})

module.exports = app;