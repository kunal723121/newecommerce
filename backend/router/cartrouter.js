import Express from "express";
import { store } from "../store.js";
import { cartmodel } from "../model/cart.js";
import { v4 } from "uuid";

export let cartrouter=Express.Router();

// http://localhost:8080/cart/add
cartrouter.post('/add',async(req,resp)=>{
    let buyername=store.name;
    let uid=v4();
    let{name,id,address,qty,sellername}=req.body;
    let pr=await cartmodel({uid,name,id,address,qty,buyername,sellername})
    await pr.save();
    resp.send({"msg":"order placed"})
})

// http://localhost:8080/cart/placedorder
cartrouter.get('/placedorder',async(req,resp)=>{
    let buyername=store.name;
    let pr=await cartmodel.find({buyername:buyername})
    resp.send(pr)
})

// http://localhost:8080/cart/receivedorder
cartrouter.get('/receivedorder',async(req,resp)=>{
    let sellername=store.name;
    let pr=await cartmodel.find({sellername:sellername})
    resp.send(pr)
})

// http://localhost:8080/cart/cancel
cartrouter.put('/cancel/:id',async(req,resp)=>{
    let uid=req.params.id;
    let pr=await cartmodel.findOneAndUpdate({uid:uid},{status:"cancelled"},{new:true});
    resp.send({"msg":"order cancelled"})
})

// http://localhost:8080/cart/accept
cartrouter.put('/accept/:id',async(req,resp)=>{
    let uid=req.params.id;
    let pr=await cartmodel.findOneAndUpdate({uid:uid,status:"pending"},{status:"order accepted"},{new:true});
    resp.send({"msg":"order received"})
})