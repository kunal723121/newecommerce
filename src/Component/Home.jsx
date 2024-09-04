import { Link, useNavigate } from "react-router-dom"
import { Auth, useAuth } from "./Auth"
import { useEffect, useState } from "react"
import { Loaad } from "./Loaad"
import axios from "axios"
export let Home = () => {
    let { islg, uplg } = useAuth()
    let nav = useNavigate()
    let [pr, uppr] = useState([])
    let [ld, sld] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8080/product/all').then((r) => {
            uppr(r.data)
        })
    })
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
    let buy = (x) => {
        nav('/buy', { state: x })
    }
    let [id, upid] = useState()
    let sr = (e) => {
        upid(e.target.value)
    }
    let search = () => {
        // window.alert(id)
        nav('/single', { state: id })
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
                        {/* <pre>{JSON.stringify(pr)}</pre> */}
                        {pr.length > 0 ? <>
                            {
                                pr.map((x) => {
                                    return <div className="col-6 mt-7 ml- card">
                                        <div className="card-header">
                                            <img height="200rem" width="200rem" src={x.photo} />
                                        </div>
                                        <div className="card-body">
                                            <h6>Product Id:{x.id}</h6>
                                            <h6>Product Name:{x.name}</h6>
                                            <h6>Product price:{x.price}$</h6>
                                            <button onClick={buy.bind(null, x)} className="btn btn-primary">Buy</button>
                                        </div>
                                    </div>
                                })
                            }
                        </> : <><h1>no product available</h1></>}
                    </div>
                </div>
            </> : <><h1>login to access the page</h1></>}
        </> : <><Loaad /></>}
    </div>
}