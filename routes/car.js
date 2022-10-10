const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../configs/db.configs');
const multer = require('multer');
const { query } = require('express');

const connection = mysql.createConnection(db.database);

connection.connect(function(err){
    if (err){
        console.log(err);
    } else {
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (carId INT PRIMARY KEY AUTO_INCREMENT,brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255))";
        // var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (carId INT PRIMARY KEY AUTO_INCREMENT,brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255), image VARCHAR(255))";
        connection.query(carTableQuery,function(err,result){
            if (result.warningCount === 0){
                console.log("Car Table Created");
            }
        })
    }
})

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'D:\Mobile Apllication\CarBuyAndSellApp\assets\cars');
    },
    // destination(req, file, callback) {
    //     callback(null, './uploads');
    // },
    filename(req, file, callback) {
        callback(null, `${file.originalname}`);
    },
});

const upload = multer({storage:storage});

// router.post('/save',upload.single('photo'),(req,res)=>{
//     // console.log(req.body.date);
//     // console.log(req.file);
//     res.send({"message":"Uploaded"});
// })


router.post('/save', upload.single('photo'), (req, res) => {
    const image = req.file.originalname;
    const brand = req.body.brand;
    const transmissionType = req.body.transmissionType;
    const fuelType = req.body.fuelType;
    const color = req.body.color;
    const price = req.body.price;
    // const image = req.body.image;

    // var query = "INSERT INTO cars (brand,transmissionType,fuelType,color,price,image) VALUES (?,?,?,?,?,?)";
    var query = "INSERT INTO cars (brand,transmissionType,fuelType,color,price) VALUES (?,?,?,?,?)";

    // connection.query(query, [brand,transmissionType,fuelType, color, price, image], (err) => {
        connection.query(query, [brand,transmissionType,fuelType, color, price], (err) => {
        if (err) {
            res.send({
                "status": "500",
                "message": "Error occured.Please try again!"
            });
        } else {
            res.send({
                "status": "200",
                "message": "Car saved successfully"
            });
        }
    })

});

// router.get('/loadCars/:brand/:transmissionType/:fuelType/:color/:price/:image', (req, res) => {
    router.get('/loadCars/:brand/:transmissionType/:fuelType/:color/:price/', (req, res) => {
    const brand = req.params.brand
    const transmissionType = req.params.transmissionType;
    const fuelType = req.params.fuelType;
    const color = req.params.color;
    const price = req.params.price;
    const image=req.params.image;

    // var query = "SELECT * FROM cars WHERE brand=?,transmissionType=?,fuelType=?,color=?,price=? AND image=?";
    var query = "SELECT * FROM cars WHERE brand=?,transmissionType=?,fuelType=?,color=? AND price=?";

    // connection.query(query, [brand,transmissionType,fuelType, color, price,image], (err, row) => {
        
    connection.query(query, [brand,transmissionType,fuelType, color, price], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.send(row);
        }
    })
})

router.delete('/deleteCar/:carId',(req,res) => {
    const carId = req.params.carId;

    var query = "DELETE FROM cars WHERE carId=? ";

    connection.query(query,[carId],(err)=>{
        if(err){
            res.send({
                "status":"500",
                "message":"Error occured.Try again!"
            });
        } else {
            res.send({
                "status":"200",
                "message":"Car deleted successfully"
            });
        }
    })
})

module.exports = router