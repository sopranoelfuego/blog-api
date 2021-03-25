

const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

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
        enum: ['user', 'author'],
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

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
   next()
  }
 const salt =await bcrypt.genSalt()
 this.password=await bcrypt.hash(this.password,salt)

})
userSchema.methods.confirmThePassword=async function(plainText){
  if(!this.password){
    console.log("this.password error is undefiid",this.password)
    console.log("this is the",plainText)
    return
  }
  return await bcrypt.compare(plainText,this.password)
}

module.exports=mongoose.model('User',userSchema)