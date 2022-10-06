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




module.exports = router