const mongoose=require('mongoose')


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please add the title'],
    },
    
    content:{
        type:String,
        required:[true,'please add the content'],
        minlength:5
    },
    
    category:{
        type:String,
        enum:['social','politic','ententairnment','health']
    }
    ,
    file:{
        data:Buffer,
        contentType:String,
        select:false
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        // required:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }



})

module.exports=mongoose.model('Post',postSchema)