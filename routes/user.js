 const router=require('express').Router()



const {register,login,getUsers,deleteUsers}=require('../controller/auth.js')

router.route('/')
        .get(getUsers)
        .delete(deleteUsers)
router.route('/register')
        .post(register)
        

router.route('/login')
        .post(login)
        

module.exports=router 
