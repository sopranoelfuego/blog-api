
const sendTokenBackToResponse=async (user,statucode,res)=>{

    const token=await user.signWithToken()
    console.log("this is token from sendTokenBack",token)
    let options={
        expires:new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE * 24 *60 *60 *1000),
        httpOnly:true
    }

    if(process.env.NODE_ENV === "production"){
        options.secure=true
    }
    res.status(statucode).cookie('token',token,options).json({success:true,token})
}
module.exports=sendTokenBackToResponse