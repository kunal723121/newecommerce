import Express from "express";
import productmodel from "../model/productmodel.js";
import { store } from "../store.js";

export let productrouter=Express.Router()

// http://localhost:8080/product/add
productrouter.post('/add',async(req,resp)=>{
    let {id,name,price,photo}=req.body
    let sellername=store.name
    let product=await productmodel.findOne({id:id})
    if(product)
    {
        return resp.send({"msg":"id already exist"})
    }
    let newproduct=new productmodel({id,name,sellername,price,photo})
    await newproduct.save()
    return resp.send({"msg":"product add done"})
})

// http://localhost:8080/product/all
productrouter.get('/all',async(req,resp)=>{
    let name=store.name
    let product=await productmodel.find({sellername:{$ne:name}})
    resp.send(product)
})

// http://localhost:8080/product/admin
productrouter.get('/admin',async(req,resp)=>{
    let name=store.name
    let product=await productmodel.find({sellername:name})
    resp.send(product)
})

// http://localhost:8080/product/delete
productrouter.delete('/delete/:id',async(req,resp)=>{
    let id=req.params.id;
    let product=await productmodel.findOne({id:id})
    if(!product)
    {
        return resp.send({"msg":"product not exist"})
    }
    await productmodel.deleteMany({id:id})
    return resp.send({"msg":"delete success"})
})

// http://localhost:8080/product/update
productrouter.put('/update/:id',async(req,resp)=>{
    let id=req.params.id;
    let product=await productmodel.findOne({id:id})
    if(!product)
    {
        return resp.send({"msg":"product not exist"})
    }
    let sellername=store.name
    let{name,price,photo}=req.body;
    product=await productmodel.findOneAndUpdate({id:id},{id:id,name:name,sellername:sellername,price:price,photo:photo},{new:true})
    product.save();
    return resp.send({"msg":"update done"})
})

// http://localhost:8080/product/search
productrouter.get('/search/:id',async(req,resp)=>{
    let id=req.params.id;
    let product=await productmodel.findOne({id:id})
    if(!product)
    {
        return resp.send({"msg":0})
    }
    resp.send(product)
})



