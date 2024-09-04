import { Link, useLocation, useNavigate } from "react-router-dom"
import { Auth, useAuth } from "./Auth"
import { useEffect, useState } from "react"
import { Loaad } from "./Loaad"
import axios from "axios"
export let Update = () => {
    let { islg, uplg } = useAuth()
    let nav = useNavigate()
    let x=useLocation()
    let id=x.state;
    let [ld, sld] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            sld(true)
        }, 1000)
    }, [ld])
    let lgout = () => {
        nav('/')
        uplg("false")
        localStorage.removeItem("login")
    }
    let[pr,uppr]=useState({
        name:"",
        price:"",
        photo:""
    })
    let prhandler=(event)=>{
        uppr({...pr,[event.target.name]:event.target.value})
    }
    let photohandler=(e)=>{
        let ph=e.target.files[0]
        let reader=new FileReader()
        reader.readAsDataURL(ph)
        reader.addEventListener("load",()=>{
            if(reader.result)
            {
                uppr({...pr,photo:reader.result})
            }
            else{}
        })
    }
    let submit=()=>{
        axios.put(`http://localhost:8080/product/update/${id}`,pr).then((r)=>{
            window.alert(r.data.msg)
        }).catch(()=>{

        })
    }
    let[iid,upid]=useState()
    let sr=(e)=>{
        upid(e.target.value)
    }
    let search=()=>{
        // window.alert(id)
        nav('/single',{state:iid})
    }
    return <div>
        {ld ? <>
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
                        <div className="col-12 mt-5 ml-5 card card-body">
                            {/* <pre>{JSON.stringify(pr)}</pre> */}
                            <form>
                                <div className="form-group">
                                    <label className="mt-1">Product Name:</label>
                                    <input onChange={prhandler}  name="name" className="form-control" type="text" placeholder="enter product name..." />
                                </div>
                                <div className="form-group ">
                                    <label className="mt-1">Price:</label>
                                    <input onChange={prhandler} name="price" className="form-control" type="text" placeholder="enter product price..." />
                                </div>
                                <div className="form-group ">
                                    <label className="mt-1">Photo:</label>
                                    <input onChange={photohandler} className="form-control" type="file" accept="image/*"/>
                                </div>
                            </form>
                            <button onClick={submit} disabled={pr.name.length===0 || pr.price.length===0 || pr.photo.length===0} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </> : <><h1>login to access the page</h1></>}
        </> : <><Loaad /></>}
    </div>
}