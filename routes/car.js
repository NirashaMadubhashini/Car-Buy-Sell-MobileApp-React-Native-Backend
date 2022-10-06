const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const { query } = require('express');

const connection = mysql.createConnection(db.database);

connection.connect(function(err){
    if (err){
        console.log(err);
    } else {
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255), image VARCHAR(255))";
        connection.query(carTableQuery,function(err,result){
            if (result.warningCount === 0){
                console.log("Car Table Created");
            }
        })
    }
})

router.post('/', (req, res) => {
    const brand = req.body.brand;
    const transmissionType = req.body.transmissionType;
    const fuelType = req.body.fuelType;
    const color = req.body.color;
    const price = req.body.price;
    const image = req.body.image;

    var query = "INSERT INTO cars (brand,transmissionType,fuelType,color,price,image) VALUES (?,?,?,?,?,?)";

    connection.query(query, [brand,transmissionType,fuelType, color, price, image], (err) => {
        if (err) {
            res.send({
                "status": "500",
                // "message": "Username Already Exists!"
            });
        } else {
            res.send({
                "status": "200",
                "message": "Car saved successfully"
            });
        }
    })

});


module.exports = router