 const router=require('express').Router()



const {register,login,getUsers}=require('../controller/auth.js')
const { route } = require('./post.js')

router.route('/')
        .get(getUsers)
router.route('/register')
        .post(register)
        

router.route('/login')
        .post(login)
        

module.exports=router 
