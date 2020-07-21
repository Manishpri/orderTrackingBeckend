const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId :{
        type : String
    },
    customerId :{
        type : String
    },
    employeeId :{
        type : String
    },
    orderDate :{
        type : Date
    },
    requiredDate :{
        type :  Date
    },
    shippedDate :{
        type : Date
    },
    shipVia :{
        type : String
    },
    frieght :{
        type : String
    },
    shipName :{
        type : String
    },
    shipAddress :{
        type : String
    },
    shipCity :{
        type : String
    },
    shipRegion :{
        type : String
    },
    shipPostalCode :{
        type : String
    },
    shipCountry :{
        type : String
    },
    status : {
        type :String,
        default : 'pending'
    }
})

module.exports = mongoose.model('order',orderSchema);