
const ErrorResponse=require('../utils/erroresponse.js')
const asyncHandler=require('../middlewares/ansync.js')
const Post=require('../models/Post.js')
const fs=require('fs')
const createPost=asyncHandler(async(req,res,next)=>{
    console.log(req.body ,"and the file is",req.file)
    // "title,category,content,file,author,date"
    const {title,category,content,date}=req.body
    const newPost=new Post()
    newPost.title=title
    newPost.category=category
    newPost.content=content
    newPost.date=date
    newPost.file.data=fs.readFileSync(req.file.path)
    newPost.file.contentType=req.file.mimetype
     await newPost.save((err,doc)=>{
         if(err){
             return next(new ErrorResponse('error post not saved...',500))
         }
         res.status(201).json({success:true,data:doc})
     })
    

})

const getPosts=asyncHandler(async(req,res,next)=>{

    const posts=await Post.find()
    if(!posts){
        return next(new ErrorResponse('failed to get the posts',500))
    }
    res.status(200).json({success:true,data:posts})
})
const getPost=asyncHandler(async(req,res,next)=>{
    res.send('this is getPost')
})
const updatePost=asyncHandler(async(req,res,next)=>{
    res.send('this is updatePost')
})
const deletePost=asyncHandler(async(req,res,next)=>{
    res.send('this is deletePost')
})
const deletePosts=asyncHandler(async(req,res,next)=>{
    res.send('this is deletePosts')
})



module.exports={
    createPost,
    getPosts,
    updatePost,
    deletePost,
    deletePosts,
    getPost,
    
}