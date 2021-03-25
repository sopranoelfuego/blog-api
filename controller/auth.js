const User=require('../models/User.js')

const mongoose=require('mongoose')
const ErrorResponse=require('../utils/erroresponse.js')
const asyncHandler=require('../middlewares/ansync.js')
const { response } = require('express')

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
        const {email,password}=await req.body
     console.log({email,password})
    //  is he set password and email
        if(!email || !password){
            console.log("email and password")
            return next(new ErrorResponse('verify if u have entered the password or email',400))
        }
    //   is the user exist
      //    1.check the user
      const user=await User.findOne({email}).select('+password')
  
      console.log("this is the user by email",user)
   
      if(!user){
          return next(new ErrorResponse('sorry register first',404))

      }
      

    // is the password correct
    const confirm=await user.confirmThePassword(password)
    console.log(confirm,user.password)
    if(!confirm){
        return next(new ErrorResponse('password incorrect ',404))
    }
    res.status(200).json({success:true,data:user})
})

const getUsers=asyncHandler(async(req,res,next)=>{
    const users=await User.find({})
    res.status(200).json({success:true,data:users})
})
const deleteUsers=asyncHandler(async(req,res,next)=>{
    
    await User.remove({})
    res.status(200).json({success:true,data:"succefull deleted..."})
})

module.exports={
    register,
    login,
    getUsers,
    deleteUsers
}