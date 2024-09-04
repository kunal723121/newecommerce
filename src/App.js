import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./Component/Login"
import { Reg } from "./Component/Reg"
import { Home } from "./Component/Home"
import { Loaad } from "./Component/Loaad"
import { Add } from "./Component/Add"
import { Buy } from "./Component/Buy"
import { Admin } from "./Component/Admin"
import { Update } from "./Component/Update"
import { Receivedorder } from "./Component/Receivedorder"
import { Placedorder } from "./Component/Placedorder"
import { Single } from "./Component/Single"

export let App=()=>{
    return <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element=<Login/> />
            <Route path="/login" element=<Login/> />
            <Route path="/reg" element=<Reg/> />
            <Route path="/home" element=<Home/> />
            <Route path="/load" element=<Loaad/> />
            <Route path="/add" element=<Add/> />
            <Route path="/buy" element=<Buy/> />
            <Route path="/admin" element=<Admin/> />
            <Route path="/update" element=<Update/> />
            <Route path="/receivedorder" element=<Receivedorder/> />
            <Route path="/placeorder" element=<Placedorder/> />
            <Route path="/single" element=<Single/> />
        </Routes>
        </BrowserRouter>
        </div>
}