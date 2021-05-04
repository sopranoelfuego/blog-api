

const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const asyncHandler = require('../middlewares/ansync')

const userSchema=new mongoose.Schema({
       name:{
           type:String,
           required:[true,'name please']
       },
    
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
      },
      role: {
        type: String,
        enum: ['user', 'author','admin'],
        default: 'user',
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
})
/*
 name,
 email.
*/ 

userSchema.pre('save',async function(next){
  if(this.isModified('password')){
    const salt =await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
 }
 next()

})
userSchema.methods.confirmThePassword=async function(plainText){
  if(!this.password){
    return
  }
  return await bcrypt.compare(plainText,this.password)
}
userSchema.methods.signWithToken=async function(){
  return await jwt.sign({id:this._id},process.env.JWT_SECRET_WORD,{
    expiresIn:process.env.JWT_SECRET_EXPIRE
  })

}


module.exports=mongoose.model('User',userSchema)