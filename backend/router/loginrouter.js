import loginmodel from "../model/loginmodel.js"
import mongoose from "mongoose"
import Express from "express"
import { store } from "../store.js"

export let loginrouter=Express.Router()

// http://localhost:8080/user/register
loginrouter.post('/register',async(req,resp)=>{
    let{name,password}=req.body
    let user=await loginmodel.findOne({name:name})
    if(user)
    {
        return resp.send({"msg":"username already exist"})
    }
    let newuser=new loginmodel({name:name,password:password})
    await newuser.save();
    return resp.send({"msg":"done"})
})

// http://localhost:8080/user/login
loginrouter.post('/login',async(req,resp)=>{
    let{name,password}=req.body;
    store.name=name;
    let user=await loginmodel.findOne({name:name,password:password})
    if(user)
    {
        return resp.send({"msg":1})
    }
    return resp.send({"msg":0})
})

// http://localhost:8080/user/glogin
loginrouter.post('/glogin',async(req,resp)=>{
    let{name,password}=req.body;
    store.name=name;
    let user=await loginmodel.findOne({name:name,password:password})
    if(user)
    {
        return resp.send({"msg":1})
    }
    user=new loginmodel({name:name,password:password})
    await user.save()
    return resp.send({"msg":0})
})
