const mongoose=require('mongoose')
const ErrorResponse=require('../utils/erroresponse.js')
const asyncHandler=require('../middlewares/ansync.js')
const Post=require('../models/Post.js')
const fs=require('fs')
const { Mongoose } = require('mongoose')

const createPost=asyncHandler(async(req,res,next)=>{

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
    const {id}=req.params

     if(!mongoose.Types.ObjectId.isValid(id)){
         return next(new ErrorResponse(`error there is not such ${id}`,404))
        }
        const post=await Post.findById(id)
        if(!post){
            return next(new ErrorResponse('post not found',404))
        }
        res.status(200).json({success:true,data:post})
    })
    
    
    const updatePost=asyncHandler(async(req,res,next)=>{
        const {id}=req.params
        console.log(id ,"and the body content",req.body)
        if(!mongoose.Types.ObjectId.isValid(id)){

            return next(new ErrorResponse(`error there is not such ${id}`,404))
        }
        let post=await Post.findById(id)
        if(!post){
            return next(new ErrorResponse('post not found'))
        }
        post =await Post.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        res.status(200).json({success:true,data:post})
        
    })



const deletePost=asyncHandler(async(req,res,next)=>{
   const {id}=req.params
   
     let post=await Post.findById(id)
     if(!post){
      return next(new ErrorResponse('post not found',404))
     }
     post=await Post.remove()
     res.status(200).json({success:true,data:"delete succefful"})
})

const deletePosts=asyncHandler(async(req,res,next)=>{
   
    await Post.deleteMany({})
    
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