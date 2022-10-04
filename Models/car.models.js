const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    
    registrationnumber: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    transmissionType: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    numberofpassengers: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema)