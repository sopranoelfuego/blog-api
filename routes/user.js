 const router=require('express').Router()



const {register,
        login,
        getUsers,
        deleteUsers,
        getUser,
        updateUserDetails,
        whoIam
        }=require('../controller/auth.js')

router.route('/')
        .get(getUsers)
        .delete(deleteUsers)
router.route('/register')
        .post(register)
        

router.route('/login')
        .post(login)
router.route('/:id')
        .get(getUser)
router.route('/updateUserDetails')
        .put(updateUserDetails)
router.route('/whoIam')
        .get(whoIam)

module.exports=router 
