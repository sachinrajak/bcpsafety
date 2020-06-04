const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
app.use(bodyParser.json())

require("./user")
const user = mongoose.model("user")
//enabling cors
var cors = require('cors')
app.use(cors())

//mongodb+srv://bookservice:bookservice@cluster0-rskzn.mongodb.net/customerservices
//mongodb://localhost:27017/
mongoose.connect("mongodb://localhost:27017/BCP",
//mongoose.connect("mongodb+srv://bookservice:bookservice@cluster0-rskzn.mongodb.net/booksservice",
 { useNewUrlParser: true , useUnifiedTopology: true },
 () => {
    console.log("Connected to database...");
})
app.get("/", (req, res) => {
    res.send("This is customer service.")
})

app.post("/registerUser", (req, res) => {
    var newUser = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        location: req.body.location,
        nomember: req.body.familycount,
        regidate:Date.now()
    }
    var us = new user(newUser);
    us.save().then(() => {
        console.log("A new user is created.")
        res.send("1");
    }).catch(err => {
        if(err.message.indexOf('duplicate')>-1){
            res.send('2');
            //throw err
        }
    })
})

app.get("/getuser/:id", (req, res) => {
    var finduser = {
        email: req.params.id
    }
   
    
    user.aggregate(
    [
        {"$match":finduser},
    { "$project": {
    "_id": 0,
    "name": "$name",
    "mobile":"$mobile",
    "location":"$location",
    "email":"$email",
    "familycount": "$nomember",
    "role": "$role"
    }}
    ]).then((userObj) => {
            res.json(userObj)
        }).catch(err => {
            if(err){
                throw err
            }
        });

    // user.find(finduser).then((userObj) => {
    //     res.json(userObj)
    // }).catch(err => {
    //     if(err){
    //         throw err
    //     }
    // })


})
var server = app.listen(3004, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
