const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const colors=require('colors')
const fileupload=require('express-fileupload')


const mongoDbConnect=require('./config/db.js')
// initiate the environemnt
dotenv.config({path:'./config/config.env'})
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// app.use(fileupload())
// initiate the db
mongoDbConnect()
// apply middlware
const PORT= process.env.PORT || 5000
app.use('/api/v1/posts',require('./routes/post.js'))

app.listen(PORT,()=>console.log(`app listen to the port ${PORT}`.blue))
