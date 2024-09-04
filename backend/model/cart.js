import mongoose from "mongoose";
import Express from "express";

let cart_sch=mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    qty:{
        type:String,
        require:true
    },
    sellername:{
        type:String,
        require:true
    },
    buyername:{
        type:String,
        require:true
    },
    id:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:"pending"
    }
})
export let cartmodel=mongoose.model("cart",cart_sch)