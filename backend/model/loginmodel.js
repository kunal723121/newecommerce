import mongoose from "mongoose";

let login_sch=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

let loginmodel=mongoose.model("user",login_sch)
export default loginmodel