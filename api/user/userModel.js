const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName : {
        type : String
    },
    email : {
        type : String
    },
    role : {
        type : String
    },
    password : {
        type : String
    }
});

module.exports = mongoose.model('user',userSchema);