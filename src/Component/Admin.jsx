import { Link, useNavigate } from "react-router-dom"
import { Auth, useAuth } from "./Auth"
import { useEffect, useState } from "react"
import { Loaad } from "./Loaad"
import axios from "axios"
export let Admin = () => {
    let { islg, uplg } = useAuth()
    let nav = useNavigate()

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
    let [pr, uppr] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/product/admin').then((r) => {
            uppr(r.data)
        }).catch(() => {

        })
    })
    let del = (x) => {
        axios.delete(`http://localhost:8080/product/delete/${x}`).then((r) => {
            window.alert(r.data.msg)
            nav('/admin')
        }).catch(() => {

        })
    }
    let upd = (x) => {
        nav('/update', { state: x })
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
                {/* <pre>{JSON.stringify(pr)}</pre> */}
                {pr.length > 0 ? <>
                    <div className="container">
                        <div className="row">
                            <div className="col mt-7 card">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Photo</th>
                                            <th>Price</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pr.map((x) => {
                                                return <tr>
                                                    <td>{x.id}</td>
                                                    <td>{x.name}</td>
                                                    <td><img height="80rem" width="80rem" src={x.photo} /></td>
                                                    <td>{x.price}</td>
                                                    <td><button onClick={upd.bind(null, x.id)} className="btn btn-primary">Update</button></td>
                                                    <td><button onClick={del.bind(null, x.id)} className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </> : <><div className="container">
                    <div className="row">
                        <div className="col mt-7">
                            <h1>no product</h1>
                        </div>
                    </div>
                </div></>}
            </> : <><h1>login to access the page</h1></>}
        </> : <><Loaad /></>}
    </div>
}