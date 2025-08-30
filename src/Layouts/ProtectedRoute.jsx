import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { TokenContext } from "../Context/TokenContext"


export default function ProtectedRoute({children}) {
   let{isLoggedIn}=useContext(TokenContext)
    return isLoggedIn? children:<Navigate to={'/login'}/>

}
