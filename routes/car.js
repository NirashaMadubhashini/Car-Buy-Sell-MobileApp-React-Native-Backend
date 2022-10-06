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
        var carTableQuery = "CREATE TABLE IF NOT EXISTS cars (date VARCHAR(255), location VARCHAR(255), description TEXT, image VARCHAR(255))";
        connection.query(carTableQuery,function(err,result){
            if (result.warningCount === 0){
                console.log("Car Table Created");
            }
        })
    }
})

router.post('/', (req, res) => {
    const date = req.body.fullName;
    const location = req.body.location;
    const description = req.body.description;
    const image = req.body.image;

    var query = "INSERT INTO cars (date,location,description,image) VALUES (?,?,?,?)";

    connection.query(query, [date, location, description, image], (err) => {
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