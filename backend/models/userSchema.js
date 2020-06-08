const mongo = require("mongoose");

// const userSchema = mongo.Schema({
//     name : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : string,
//         required : false,
//         unique : false
//     },
//     password :  {
//         type : String,
//         required : true
//     },
//     created_at : {
//         type :Date,
//     }
// })



const userSchema = mongo.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :  {
        type : String,
        required : true
    },
    created_at : {
        type :Date,
        default : Date.now()
    },
    recent : [String],
})

module.exports = mongo.model('User',userSchema);

// const userSchema = mongo.Schema({
//     name : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : string,
//         required : false,
//         unique : false
//     },
//     password :  {
//         type : String,
//         required : true
//     },
//     created_at : {
//         type :Date,
//     }
// })

