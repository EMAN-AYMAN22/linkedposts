import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './Pages/FeedPage'
import ProfilePage from './Pages/ProfilePage'
import PostDetailsPage from './Pages/PostDetailsPage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NotfoundPage from './Pages/NotfoundPage'
import ProtectedRoute from './Layouts/ProtectedRoute'
import AuthoProtectedRoute from './Layouts/AuthoProtectedRoute'

const rourers=createBrowserRouter([
  {path:'',element:<MainLayout/>,children:[
    {index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><ProfilePage/></ProtectedRoute>},
    {path:'post-detailes/:id',element:<ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
    {path:'*',element:<NotfoundPage/>},
  ]},
  {path:'',element:<AuthLayout/>,children:[
    {path:'register',element:<AuthoProtectedRoute><Register/></AuthoProtectedRoute>},
    {path:'login',element:<AuthoProtectedRoute><Login/></AuthoProtectedRoute>},
  ]}
])

function App() {


  return ( <>
  <RouterProvider router={rourers}></RouterProvider>
    </>
  )
}

export default App
