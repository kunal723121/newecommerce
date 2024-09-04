import mongoose from "mongoose";
import Express from "express";
import { loginrouter } from "./router/loginrouter.js";
import cors from 'cors';
import { productrouter } from "./router/productrouter.js";
import { cartrouter } from "./router/cartrouter.js";
let app=Express();

app.use(cors())
app.use(Express.json({limit:'50mb'}));
app.use(Express.urlencoded({
    extended:"true",
    limit:'50mb'
}))

app.get('/',(req,resp)=>{
    resp.send("welcome")
})

app.use('/user',loginrouter)
app.use('/product',productrouter)
app.use('/cart',cartrouter)

mongoose.connect('mongodb://localhost:27017/newapp').then(()=>{
    console.log("mongodb is connected")
}).catch(()=>{
    console.log("mongodb connecting error")
})
app.setMaxListeners(20);
app.listen(8080,(err)=>{
    if (err) throw err
    console.log("server is connected")
})