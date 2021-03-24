const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
       name:{
           type:String,
           required:[true,'name please']
       },
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

module.exports=mongoose.model('User',userSchema)