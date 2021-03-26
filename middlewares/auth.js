const ErrorResponse=require('../utils/erroresponse.js')
const jwt=require('jsonwebtoken')
const asyncHandler=require('../middlewares/ansync.js')
const User=require('../models/User.js')
// here we check if the user is already signed in then we get him back 
// with his token and create a req.user which will be used so far
const protectRoute=asyncHandler(async(req,res,next)=>{
    let token
    console.log("this is the headr from ",req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

       token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new ErrorResponse('unauthorized ',401))
    }
     try {
        let decoder=await jwt.verify(token,process.env.JWT_SECRET_WORD)
        if(decoder){
             
            req.user=await User.findById(decoder.id)
        }
        next()
     } catch (error) {
         return  next(new ErrorResponse('login first',401))
     }
})




module.exports=protectRoute