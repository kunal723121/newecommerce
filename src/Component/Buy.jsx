import { Link, useLocation, useNavigate } from "react-router-dom"
import { Auth, useAuth } from "./Auth"
import { useEffect, useState } from "react"
import { Loaad } from "./Loaad"
import axios from "axios"
export let Buy=()=>{
    let{islg,uplg}=useAuth()
    let nav=useNavigate()

    let[ld,sld]=useState(false)

    let x=useLocation()
    let data=x.state
    useEffect(()=>{
        setTimeout(()=>{
            sld(true)
        },1000)
    },[ld])

    let lgout=()=>{
        nav('/')
        uplg("false")
        localStorage.removeItem("login")
    }
    let[pr,uppr]=useState({
        name:"",
        address:"",
        qty:"",
        sellername:data.sellername,
        id:data.id,
        name:data.name
    })
    let uphandler=(e)=>{
        uppr({...pr,[e.target.name]:e.target.value})
    }
    let submit=()=>{
       axios.post('http://localhost:8080/cart/add',pr).then((r)=>{
        window.alert(r.data.msg)
       }).catch()
    }
    let[id,upid]=useState()
    let sr=(e)=>{
        upid(e.target.value)
    }
    let search=()=>{
        // window.alert(id)
        nav('/single',{state:id})
    }
    return <div>
        { ld ? <>
            {islg ? <>
                <nav className="navbar fix bg-dark navbar-dark navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand">E-Com</Link>

                        <form className="frm1" role="search" >
                            <label className="label1" for="search">Search for stuff</label>
                            <input onChange={sr} className=" input1 ipt1" id="search" name="x" type="number" placeholder="Search product by id..." autofocus required />
                            <button onClick={search} className="bbtn bbtn1" type="submit">Go</button>
                        </form>

                        <div className="ml-auto">
                            <ul className="navbar-nav">
                                <li><Link to='/home' className="nav-link">All</Link></li>
                                <li><Link to="/add" className="nav-link">Add</Link></li>
                                <li><Link to="/admin" className="nav-link">Admin</Link></li>
                                <li><Link to="/receivedorder" className="nav-link">Received-Order</Link></li>
                                <li><Link to="/placeorder" className="nav-link">Placed-Order</Link></li>
                                <li onClick={lgout}><Link className="nav-link">Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
        <div className="container">
                    <div className="row">
                        <div className="col-12 mt-7 ml-5 card card-body">
                            {/* <pre>{JSON.stringify(data)}</pre> */}
                            <form>
                                <div className="form-group ">
                                    <label className="mt-1">Name : </label>
                                    <input name="name" onChange={uphandler} className="form-control" type="text" placeholder="enter your name..." />
                                </div>
                                <div className="form-group">
                                    <label className="mt-1">Address : </label>
                                    {/* <input className="form-control" type="textarea" placeholder="enter product name..." /> */}
                                    <textarea name="address" onChange={uphandler} className="form-control" placeholder="enter complete address..." />
                                </div>
                                <div className="form-group ">
                                    <label className="mt-1">Quantity : </label>
                                    <input name="qty" onChange={uphandler} className="form-control" type="number" placeholder="enter product price..." />
                                </div>
                                <div className="form-group flex">
                                    <label className="mt-1">Total : </label>
                                    <h5 className="mt-1">{pr.qty*data.price}</h5>
                                </div>
                            </form>
                            <button disabled={pr.name.length===0 || pr.qty<0 || pr.address.length===0} onClick={submit}  className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
        </>:<><h1>login to access the page</h1></>}
        </>:<><Loaad/></> }
    </div>
}