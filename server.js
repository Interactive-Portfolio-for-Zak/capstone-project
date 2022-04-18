// required imports
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const router = express.Router();
const port = process.env.PORT || 5000;
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const ServerSchema = require('./ServerSchema');

// import course schema for materials
const CourseSchema = require("./CourseSchema");

//create the initial connection to the database
mongoose.connect("mongodb://localhost:27017/zakPortfolio", {useNewUrlParser: true}, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded!")
  } else {
    console.log(`Error in DB connection: ${err}`)
  }
});

//init the database through the connection constructor, stored in a variable
const db = mongoose.connection

//binds error message to the connection variable to print if an error occurs
db.on('error', console.error.bind(console, 'connection error'))

//creating the entry model utilizing the entry schema and entries collection
const Entry = mongoose.model("entries", ServerSchema)

//middleware functions
app.use(express.static("./build"))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json());
app.use("/", router);

// create model for Courses
const Courses = mongoose.model("courses", CourseSchema);

// create API route for the front end to access the COURSES
app.get("/materials", async (request, response) => {
  let allCourses = await Courses.find({"courseMaterials": "materials"})
  response.json(allCourses)
})


app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})

//Setting up nodemailer with gmail
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.USER,
    pass: process.env.PASS,
  },

});

contactEmail.verify((error) => {
  if (error){
    console.log(error);
  } else {
    console.log("Ready to send")
  }
});

// setting up the router to send an email
router.post("/contact", (req,res) => {
const name = req.body.name;
const email = req.body.email;
const subject = req.body.subject;
const message = req.body.message;

const mail = {
  from: `Contact Form: ${email}`,
  to: "portfoliotest001@gmail.com",
  subject: subject,
  html: `<p>Name: ${name}</p>
  <p>Email: ${email}</p>
  <p>Message: ${message}</p>`
};

contactEmail.sendMail(mail, (error) => {
  if (error) {
    res.json({status: "ERROR"});
  } else {
    res.json({status: "Message Sent"})
  }
});

});


  
// redirecting to the home page 
//  res.redirect("http://localhost:3000/contact")