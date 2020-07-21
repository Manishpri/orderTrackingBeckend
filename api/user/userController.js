userModel = require('./userModel');

class userController{
    static async create(req,res){
        try{
            console.log(req.body)
            if(!req.body){
                res.status(400).json({
                    status:error,
                    message : 'Body parameters missing'
                })
            }else{
               const user = new userModel(req.body);
               await user.save().then(response=>{
                   if(!response){
                       res.status(501).json({
                           status:'error',
                           message : 'Internal server error'
                       })
                   }else{
                       res.status(200).json({
                           status:'success',
                           response:response
                       })
                   }
               }).catch(error=>{
                res.status(500).json({
                    status : 'error',
                    message : 'server error'
                })
               })
            }
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'server error'
            })
        }
    }

    static async update(req,res){
        try{
            if(!req.body){
                res.status(400).json({
                    status:'error',
                    message:'Body parameter missing'
                })
            }else{
                userModel.findByIdAndUpdate(req.params._id,{
                    fullName : req.body.fullName,
                    email : req.body.email,
                    role : req.body.role,
                },{new:true}).then(response=>{
                    if(!response){
                        res.status(404).json({
                            status:'error',
                            message : 'User Not Found'
                        })
                    }else{
                        res.status(201).json({
                            status : 'success',
                            message:'User Updated Successfully !!!',
                            response :response
                        })
                    }
                }).catch(error=>{
                    res.status(500).json({
                        status : 'error',
                        message : 'server error'
                    })
                })
            }
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'server error'
            })
        }
    }

    static async findAll_users(req,res){
        try{
            userModel.find().then(response=>{
                if(!response){
                    res.status(404).json({
                        status : 'error',
                        message : 'User Not Found'
                    })
                }else{
                    res.status(200).json({
                        status : 'success',
                        response : response
                    })
                }
            })
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'Internal server error'
            })
        }
    }

    static async findOne(req,res){
        try{
            userModel.findById({_id:req.params._id}).then(response=>{
                if(!response){
                    res.status(404).json({
                        status : 'error',
                        message :'User Not Found'
                    })
                }else{
                    res.status(200).json({
                        status:'success',
                        message : 'user returned successfully',
                        response : response
                    }) 
                }
            }).catch(error=>{
                res.status(500).json({
                    status:'error',
                    message : 'Internal server error'
                })
            })
        }catch(error){
            res.status(500).json({
                status : 'error',
                message : 'Internal Server Error'
            })
        }
    }

    static async login(req,res){
        try{
            if((req.body.email == '' || req.body.email == null || req.body.email == undefined) || (req.body.password == '' || req.body.password == null || req.body.password == undefined)){
                res.status(400).json({
                    status : 'error',
                    error :'Body Parameters Missing'
                })
            }else{
                userModel.findOne({email:req.body.email}).then(response=>{
                    if(!response){
                        res.status(404).json({
                            status :'error',
                            error : 'Data Not Found'
                        })
                    }else{
                        if(req.body.email === response.email && req.body.password === response.password){
                            res.status(200).json({
                                status : 'success',
                                message : 'Login successfully',
                                response : response
                            })
                        }else{
                           
                            res.send({
                                status :'error',
                                error : 'Email or password Incorrect'
                            })  
                        }
                    }
                }).catch(error=>{
                  
                    res.status(500).json({
                        status : 'error',
                        error : 'Something went wrong'
                    })
                })
            }
        }catch(error){
          
            res.status(500).json({
                status:'error',
                error : 'Internal Server Error'
            })
        }
    }
}



module.exports = userController