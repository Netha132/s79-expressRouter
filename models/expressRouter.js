let mongoose = require('mongoose');


let routerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    profilePic: String
})


let expressRouter = new mongoose.model('expressRouter',routerSchema,"expressDetails");

module.exports = expressRouter;