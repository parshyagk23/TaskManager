require('dotenv').config()  

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AuthRouter =require('./Routes/auth')
const TaskRouter = require('./Routes/Task')

const taskManagerUrl = process.env.TASKMANAGER_DATABASE_URL


const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/task',TaskRouter)

app.get('/',(req,res) =>{
    res.json({
        message:"Welcome to Task Manager App"
    })
})


app.listen(3000,()=>{
    try {
        console.log('Server is running on port 3000')
        mongoose.connect(taskManagerUrl).then(()=>{
            console.log('Connected to database')
        })
       
        
    } catch (error) {
        console.log(error)
    }
})



