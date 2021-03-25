const mongoose= require('mongoose')


// const mongoDbConnect=async ()=>{
//   const con= await  mongoose.connect(process.env.MONGO_URI,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//         useCreateIndex:true,
//         useFindAndModify:true
//     }).then(()=>console.log("connected succeful")).catch(error => console.log(error))
//     console.log(con)
// }
const url='mongodb://localhost:27017/iwacu'
const mongoDbConnect=async () => await  mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>console.log("db connected succeful".blue.inverse)).catch(error => console.log(error))
module.exports=mongoDbConnect