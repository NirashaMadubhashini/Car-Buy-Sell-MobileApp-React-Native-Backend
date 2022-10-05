const express = require('express')
// const mongoose = require('mongoose')
const user = require('./routes/user')
const car = require('./routes/car')

const app = express()
const port = 8000

app.use(express.json())

app.use('/user',user)
app.use('/car',car)

// const url = 'mongodb://127.0.0.1/carSaleBackend'

// mongoose.connect(url,{useNewUrlParser: true})
// const con = mongoose.connection

// con.on("open",()=>{
//     console.log("MongoDB connected!");
// })

app.listen(port, ()=>{
    console.log(`app listening port ${port}`);
}) 