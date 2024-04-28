const mongoose = require("mongoose");

// const connection =  mongoose.createConnection('mongodb://127.0.0.1:27017/carbonCampus').on('open',() =>{
//     console.log("Connected to db");
// }).on('error',() => {
//     console.log("Connection Error");
// })


const connection =  mongoose.createConnection('mongodb+srv://aditya203k:sharmakadatais0@carboncampus.htuy6dv.mongodb.net/carbonCampus').on('open',() =>{
    console.log("Connected to db");
}).on('error',() => {
    console.log("Connection Error");
})



module.exports = connection;