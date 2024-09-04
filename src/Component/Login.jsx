import Axios from "axios"
import { useEffect, useState } from "react"
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./Auth"
import { Loaad } from "./Loaad"
import axios from "axios"
export let Login = () => {
    let[state,setstate]=useState({
        name:"",
        password:""
    })
    let{islg,uplg}=useAuth()
    let nav=useNavigate()
    let[ld,sld]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            sld(true)
        },1000)
    },[ld])
    let uphand=(e)=>{
        setstate({...state,[e.target.name]:e.target.value})
    }
    let login=()=>{
        Axios.post('http://localhost:8080/user/login',state).then((resp)=>{
            console.log(resp.data.msg)
            if(resp.data.msg===1)
            {
                uplg("true")
                localStorage.setItem("login","true")
                nav('/home')
                setTimeout(()=>{
                    sld(!ld)
                },1000)
            }
            else
            {
                window.alert("wrong credentials")
            }
        }).catch()
    }
    let f=(err)=>{
        console.log(err)
    }
    let s=(r)=>{
        let user=jwtDecode(r.credential)
        console.log(user)
        axios.post('http://localhost:8080/user/glogin',{
            name:user.name,
            password:user.sub
        }).then((resp)=>{
            if(resp.data.msg===1)
            {
                window.alert("login success")
                uplg("true")
                localStorage.setItem("login","true")
                nav('/home')
                // setTimeout(()=>{
                //     sld(!ld)
                // },1000)
            }
            else
            {
                window.alert("registered succedd")
                uplg("true")
                localStorage.setItem("login","true")
                nav('/home')
            }
        })
    }
    return <div>
        {ld ? <>
            <div className="bgi">
        <div className="container">
            {/* <pre>{JSON.stringify(state)}</pre> */}
            <div className="row">
                <div className="col-10 ml-5 mt-10">
                    <form>
                        <div className="form-group">
                            <label>USER Name:</label>
                            <input onChange={uphand} name="name" className="form-control" type="text" placeholder="enter login id..." />
                        </div>
                        <div className="form-group">
                            <label>PASSWORD:</label>
                            <input onChange={uphand} name="password" className="form-control" type="password" placeholder="enter login id..." />
                        </div>
                    </form>
                    <div className="flex">
                        <button disabled={state.name.length===0 || state.password.length===0} onClick={login} className="btn btn-primary">Login</button>
                        <h5 className="mt-2 ml-2"> New User ?  <Link to="/reg">Register</Link></h5>
                    </div>
                    <div className="mt-2">
                    <GoogleOAuthProvider clientId="422396320187-bcqbenbc960am3k6k8oaifv58ppr1a0v.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={s}
                            onFailure={f}
                            buttonText="Login With Google"
                        />
                    </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>:<><Loaad/></>}
        
    </div>
}