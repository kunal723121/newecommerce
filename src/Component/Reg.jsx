import Axios from "axios"
import { useState } from "react"
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./Auth"
import axios from "axios"

export let Reg =()=> {
    let[state,setstate]=useState({
        name:"",
        password:""
    })
    let{islg,uplg}=useAuth()
    let nav=useNavigate()
    let uphand=(e)=>{
        setstate({...state,[e.target.name]:e.target.value})
    }
    let register=()=>{
        Axios.post('http://localhost:8080/user/register',state).then((resp)=>{
            window.alert(resp.data.msg)
        })
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
            }
            else
            {
                window.alert("registered success")
                uplg("true")
                localStorage.setItem("login","true")
                nav('/home')
            }
        })
    }
    return <div className="bgi">
        <div className="container">
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
                        <button disabled={state.name.length===0 || state.password.length===0} onClick={register} className="btn btn-primary">Register</button>
                        <h5 className="mt-2 ml-2"> Existing User ?  <Link to="/login">Login</Link></h5>
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
}