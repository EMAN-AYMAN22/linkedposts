import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
export default function Navbar() {

  let{isLoggedIn,setIsLoggedIn,setUserData}=useContext(TokenContext)  

  const navigate= useNavigate()
  function logOut() {
    localStorage.removeItem('token')
    setIsLoggedIn(null)
    setUserData(null)
    
    navigate('/login')
  }
  return (
    <>
    
      <HeroNavbar>
        <NavbarBrand>
          <NavLink to={'/'} className="font-bold text-inherit">linked posts</NavLink>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            {isLoggedIn? <Button onClick={logOut} variant="bordered">
              logOut
            </Button>:<>
             <Button variant="bordered">
              <NavLink to={"/registere"}>Sign Up</NavLink>
            </Button>
            <Button variant="bordered">
              <NavLink to={"/login"}>Sign in</NavLink>
            </Button>
            </>}
           
           
          </NavbarItem>
        </NavbarContent>
      </HeroNavbar>
    </>
  );
}
