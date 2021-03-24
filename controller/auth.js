const User=require('../models/User.js')

const mongoose=require('mongoose')
const ErrorResponse=require('../utils/erroresponse.js')
const asyncHandler=require('../middlewares/ansync.js')

/*name,email,password,*/ 

const register=asyncHandler(async(req,res,next)=>{
     const user=await User.create(req.body)
     console.log(req.body)

     if(!user){
         return next(new ErrorResponse('error register failed',500))

     }
  res.status(201).json({success:true,data:user})
})
const login=asyncHandler(async(req,res,next)=>{
        const {email,password}=req.body

    //  is he set password and email
        if(!email || !password){
            return next(new ErrorResponse('enter the crendentials',400))
        }
    //   is the user exist
    
      const user=await User.findOne({email:email})

      if(!user){
          return next(new ErrorResponse('sorry register first',404))

      }
      

    // is the password correct
    const confirm=await user.confirmThePassword(password)
    if(!confirm){
        return next(new ErrorResponse('password incorrect ',401))
    }
    res.status(200).json({success:true,data:user})
})

const getUsers=asyncHandler(async(req,res,next)=>{
    const users=await User.find({})
    res.status(200).json({success:true,data:users})
})


module.exports={
    register,
    login,
    getUsers
}