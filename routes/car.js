const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const { query } = require('express');

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to the MySQL Server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS cars (registrationnumber VARCHAR(255)  PRIMARY KEY,brand VARCHAR(255),transmissionType VARCHAR(255),fuelType VARCHAR(255),color VARCHAR(255),numberofpassengers VARCHAR(255),price VARCHAR(255),img VARCHAR(255))";
        connection.query(userTableQuery, function (err, result) {
            if (result.warningCount === 0) {
                console.log("User table created");
            }
        })
    }
})


router.post('/', (req, res) => {
    const registrationnumber = req.body.registrationnumber;
    const brand=req.body.brand;
    const transmissionType = req.body.transmissionType;
    const fuelType = req.body.fuelType;
    const color = req.body.color;
    const numberofpassengers=req.body.numberofpassengers;
    const price=req.body.price;
    const img=req.body.img;


    var query = "INSERT INTO cars (registrationnumber,brand,transmissionType,fuelType,color,numberofpassengers,price,img) VALUES (?,?,?,?,?,?,?,?)";

    connection.query(query, [registrationnumber,brand, transmissionType, fuelType,color,numberofpassengers,price,img], (err) => {
        if (err) {
            res.send({
                "status": "500",
                "message": "Username Already Exists!"
            });
        } else {
            res.send({
                "status": "200",
                "message": "User saved successfully"
            });
        }
    })

});


// router.get('/login/:username/:password', (req, res) => {
//     const username = req.params.username
//     const password = req.params.password;

//     var query = "SELECT * FROM users WHERE username=? AND password=?";

//     connection.query(query, [username,password], (err, row) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(row);
//         }
//     })
// })



// router.put('/:id', async(req,res)=>{
//     const data = req.body

//     try {
//         const car = await Car.findById(req.params.id)
//         car.registrationnumber = data.registrationnumber,
//         car.brand = data.brand,
//         car.transmissionType = data.transmissionType,
//         car.fuelType = data.fuelType,
//         car.color = data.color,
//         car.numberofpassengers = data.numberofpassengers,
//         car.price = data.price,
//         car.img = data.img
        
//         const response = await car.save()

//         res.send("Updated!")
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.delete('/:id', async(req,res)=>{
//     try {
//         const car = await Car.findById(req.params.id)
//         const response = car.remove()
//         res.send("Deleted!")
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.get('/:id', async(req,res)=>{
//     try {
//         const car = await Car.findById(req.params.id)
//         res.send(car)
//     } catch (error) {
//         res.send(error)
//     }
// })

module.exports = router