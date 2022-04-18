// import mongoose to the schema
const mongoose = require('mongoose')

// create mongoose schema for courses
const CourseSchema = new mongoose.Schema({
    courseMaterials: String,
})

// export the CourseSchema
module.exports = CourseSchema