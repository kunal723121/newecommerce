import { Link, useNavigate } from "react-router-dom"
import { Auth, useAuth } from "./Auth"
import { useEffect, useState } from "react"
import { Loaad } from "./Loaad"
export let Home=()=>{
    let{islg,uplg}=useAuth()
    let nav=useNavigate()

    let[ld,sld]=useState(false)
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
    return <div>
        { ld ? <>
            {islg ? <>
            <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
            <Link className="navbar-brand">E-Com</Link>

            <form className="frm1"  role="search" >
               <label className="label1" for="search">Search for stuff</label>
               <input   className=" input1 ipt1" id="search" name="x" type="number" placeholder="Search product by id..." autofocus required />
               <button  className="bbtn bbtn1" type="submit">Go</button>    
            </form>

            <div className="ml-auto">
                <ul className="navbar-nav">
                    <li><Link className="nav-link">All</Link></li>
                    <li><Link to="/add" className="nav-link">Add</Link></li>
                    <li><Link className="nav-link">Admin</Link></li>
                    <li onClick={lgout}><Link className="nav-link">Logout</Link></li>
                </ul>
            </div>
        </nav>
        </>:<><h1>login to access the page</h1></>}
        </>:<><Loaad/></> }
    </div>
}