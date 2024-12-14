import { useState,useEffect,useContext,createContext } from "react";
import { getCurrentUser } from "../lib/appwrite";

   const GlobalContext = createContext()

export const useGlobalContext = ()=>useContext(GlobalContext)

 const GlobalProvider = ({children})=>{

    const [isLoading,setIsLoading] = useState(true)
    const [user,setUser] = useState(null)
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    useEffect(()=>{
        getCurrentUser()
            .then((res)=>{
                if(res){
                    setIsLoggedIn(true)
                    setUser(res)
                }
                else{
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    },[])




    return (
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider