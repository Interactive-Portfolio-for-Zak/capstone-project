//importing mongoose
const mongoose = require('mongoose')

//creating mongoose Schema
const ServerSchema = new mongoose.Schema({
    //key value pairs are the name of the key and what TYPE you want the value to be
    date: Date,
});


//exporting just the MessageSchema
module.exports = ServerSchema