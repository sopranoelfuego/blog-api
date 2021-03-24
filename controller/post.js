
const ErrorResponse=require('../utils/erroresponse.js')
const asyncHandler=require('../middlewares/ansync.js')
const Post=require('../models/Post.js')
const fs=require('fs')
const createPost=asyncHandler(async(req,res,next)=>{
    console.log(req.body ,"and the file is",req.file)
    // "title,category,content,file,author,date"
    const {title,category,content,date}=req.body
    const newPost=new Post
    newPost.title=title
    newPost.category=category
    newPost.content=content
    newPost.date=date


})

const getPosts=asyncHandler(async(req,res,next)=>{
    res.send('this is getPosts')
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