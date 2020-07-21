const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3301
const userRoute = require('./api/user/userRoute');
const orderRoute = require('./api/order/orderRoute');


mongoose.connect('mongodb://127.0.0.1:27017/gizbel',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology:true,
    useFindAndModify : false
}).then(()=>{
    console.log('Database conneted successfully !!!')
}).catch(error=>{
    console.log(`connection failed ${error}`)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/user',userRoute);
app.use('/order',orderRoute);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})