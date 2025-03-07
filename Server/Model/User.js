const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(

    {
        username:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        }

    },
    {timestamps:{createdAt:'createdAt' , updatedAt:'UpdatedAt'}}
)

module.exports = mongoose.model("User",userSchema);