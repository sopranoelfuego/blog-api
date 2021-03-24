const express=require('express')
const {createPost,getPosts,updatePost,deletePost,deletePosts,getPost}=require('../controller/post.js')
const router=express.Router()
const multer=require('multer')



// define the storage
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')
    }
})

const upload=multer({storage})

router.route('/')
 .get(getPosts)
  .post(upload.single('file'),createPost)
  .delete(deletePosts)
  
router.route('/:id')
 .get(getPost)
  .post(updatePost)
  .delete(deletePost)

module.exports=router