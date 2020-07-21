const orderModel = require('./orderModel');

class orderController {
   
    static async create(req,res){
        console.log(req.body)
        try{
            if(!req.body){
                res.status(400).json({
                    status : 'error',
                    message : 'Body parameter missing'
                })
            }else{
                const order = new orderModel(req.body);
                await order.save().then(response=>{
                    res.status(200).json({
                        status : 'success',
                        message : 'order saved successfully !!!',
                        response : response
                    })
                }).catch(error=>{
                    res.status(500).json({
                        status : 'error',
                        message : 'Internal Server Error',
                        error : error
                    })
                })
            }
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'Internal Server Error'
            })
        }
    }

    static async findAll_orders(req,res){
        try{
            var perPage = 5;
            var page = req.params.page || 1
            orderModel.find().skip((perPage*page)-perPage).limit(perPage).then(response=>{
                if(!response){
                    res.status(404).json({
                        status:'error',
                        message : 'Order Not Found'
                    })
                }else{
                    orderModel.countDocuments({}).then(countOrder=>{
                        res.status(200).json({
                            status : 'success',
                            message : 'Returned Successfully !!!',
                            response : response,
                            total:countOrder
                        })
                    })
                    
                }
            }).catch(error=>{
                res.status(500).json({
                    status : 'error',
                    message : 'Internal Server Error',
                    error : error
                })
            })
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'Internal Server Error',
                error : error
            })
        }
    }

    static async cancel_order(req,res){
        try{
            if(!req.body){
                res.status(400).json({
                    status : 'error',
                    message : 'Body parameter missing'
                })
            }else{
                if(req.body.status == 'cancel'){
                    orderModel.findByIdAndUpdate({_id:req.params._id},
                        {
                            status : req.body.status
                        },{new:true}).then(response=>{
                            if(!response){
                                res.status(404).json({
                                    status : 'error',
                                    message : 'Order Not Found'
                                })
                            }else{
                                res.status(201).json({
                                    status: 'success',
                                    message : 'your order is canceled'
                                })
                            }
                        }).catch(error=>{
                            res.status(500).json({
                                status : 'error',
                                message : 'Internal server error'
                            })
                        })
                }
            }
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'Internal server error'
            })
        }
    }
}

module.exports = orderController