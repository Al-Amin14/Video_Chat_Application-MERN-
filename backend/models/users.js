import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile:{
      type:String,
      require:true  
    },
    password: {
        type: String,
        require: true
    },
    confirmPass: {
        type: String,
        require: true
    }
    },{
        timestamps:true
    }
)

const users = mongoose.model('users', userSchema)

export default users