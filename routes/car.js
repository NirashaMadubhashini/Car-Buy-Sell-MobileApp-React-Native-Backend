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
        // var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (username VARCHAR(255),brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255), image VARCHAR(255))";
        // var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255), image VARCHAR(255))";
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (brand VARCHAR(255), transmissionType VARCHAR(255), fuelType VARCHAR(255),color VARCHAR(255),price VARCHAR(255))";
        connection.query(carTableQuery,function(err,result){
            if (result.warningCount === 0){
                console.log("Car Table Created");
            }
        })
    }
})

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './uploads');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({storage:storage});

// router.post('/save',upload.single('photo'),(req,res)=>{
//     // console.log(req.body.date);
//     // console.log(req.file);
//     res.send({"message":"Uploaded"});
// })


router.post('/save', (req, res) => {
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
                // "message": "Username Already Exists!"
                "message": "Car saved Unsuccessfully"
            });
        } else {
            res.send({
                "status": "200",
                "message": "Car saved successfully"
            });
        }
    })

});

router.get('/update/:brand/:transmissionType/:fuelType/:color/:price', (req, res) => {
    const brand = req.params.brand
    const transmissionType = req.params.transmissionType;
    const fuelType = req.params.fuelType;
    const color = req.params.color;
    const price = req.params.price;

    var query = "SELECT * FROM users WHERE brand=?,transmissionType=?,fuelType=?,color=? AND price=?";

    connection.query(query, [brand,transmissionType,fuelType, color, price], (err, row) => {
        if (err) {
            console.log(err);
        } else {
            res.send(row);
        }
    })
})


module.exports = router