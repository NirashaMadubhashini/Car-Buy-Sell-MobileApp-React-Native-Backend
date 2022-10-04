const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())

const Car = require('../Models/car.models')

router.get('/', async(req,res)=>{
    try {
        const cars = await Car.find()
        res.send(cars)
        console.log("car get");
    } catch (error) {
        res.send(error)
    }
})

router.post('/', (req,res)=>{
    const data = req.body.data
    console.log(data);
    const newCar = new Car({
        registrationnumber: data.registrationnumber,
        brand: data.brand,
        transmissionType: data.transmissionType,
        fuelType: data.fuelType,
        color: data.color,
        numberofpassengers: data.numberofpassengers,
        price: data. price,
        img: data.img
    });
    try {
        const response = newCar.save()
        res.send("Saved!")
    } catch (error) {
        res.send(error)
    }
})

router.put('/:id', async(req,res)=>{
    const data = req.body

    try {
        const car = await Car.findById(req.params.id)
        car.registrationnumber = data.registrationnumber,
        car.brand = data.brand,
        car.transmissionType = data.transmissionType,
        car.fuelType = data.fuelType,
        car.color = data.color,
        car.numberofpassengers = data.numberofpassengers,
        car.price = data.price,
        car.img = data.img
        
        const response = await car.save()

        res.send("Updated!")
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const car = await Car.findById(req.params.id)
        const response = car.remove()
        res.send("Deleted!")
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const car = await Car.findById(req.params.id)
        res.send(car)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router