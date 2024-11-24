const mongoose = require('mongoose')


const conection = mongoose.connect('mongodb+srv://Mubbashir123:Mubbashir1234@airbnb1.873o2.mongodb.net/MernAuth').then(()=>{
    console.log("DataBase Conected")
})

module.exports = conection