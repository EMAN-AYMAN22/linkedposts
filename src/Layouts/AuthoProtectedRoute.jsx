import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'

export default function AuthoProtectedRoute({children}) {

      let {isLoggedIn}=useContext(TokenContext)  
      return !isLoggedIn? children:<Navigate to={'/'}/>

}
