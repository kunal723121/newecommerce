import mongoose, { mongo } from "mongoose";

let product_sch=mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    sellername:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    }
})

let productmodel=mongoose.model("products",product_sch)
export default productmodel