import { createContext, useContext, useState } from "react";

let context=createContext()
export let useAuth=()=>{
    return useContext(context)
}
export let Auth=(props)=>{
    let[islg,uplg]=useState(()=>{
        return localStorage.getItem("login")==="true"
    }
    )
    return <context.Provider value={{islg,uplg}}>
        {props.children}
    </context.Provider>
}