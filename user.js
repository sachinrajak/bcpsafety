const mongoose = require("mongoose")
mongoose.model("user", {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true

    },
    mobile: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    nomember: {
        type: Number,
        require: true,
        alias:'familycount'
    },
    regidate:{
        type:Date,
        dafult:Date.now
    },
    role:{
        type:String,
        require:false
    }
})