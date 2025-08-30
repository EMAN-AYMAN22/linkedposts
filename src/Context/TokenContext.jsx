import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/authServices";

export const TokenContext = createContext();
export default function TokenContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [userData, setUserData] = useState(null);
  async function getLoggedUserData() {
    const response = await getUserDataApi();
    if (response.message) {
      setUserData(response.user);
    }
  }

  useEffect(() => {
if (isLoggedIn) {
      getLoggedUserData();

}  }, [isLoggedIn]);

  return (
    <TokenContext.Provider value={{ isLoggedIn, setIsLoggedIn,userData,setUserData }}>
      {children}
    </TokenContext.Provider>
  );
}
