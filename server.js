const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./Components/route")

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(routes)

mongoose.connect("mongodb://localhost:27017/dbForTestCases",{
    useNewUrlParser: true
});

mongoose.connection.on("error",(err)=>{
    console.log("error", err)
})

mongoose.connection.on("connected",()=>{
    console.log("Mongoose is connected")
})


module.exports = app.listen(port,()=>{
    console.log("Server is listening to this port " + port)
})

app.use((err, req, res, next)=>{
    res.send(err)
})

// module.exports = app;   // for testing