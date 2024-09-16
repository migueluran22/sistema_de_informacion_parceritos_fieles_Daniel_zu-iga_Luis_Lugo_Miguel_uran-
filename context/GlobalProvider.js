import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext
(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLogged] = useState(false);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        getCurrentUser()
          .then((res) => {
            if (res) {
              setIsLogged(true);
              setUser(res);
            } else {
              setIsLogged(false);
              setUser(null);
            }
          })
        .catch((error) =>{
            console.log(error);
        })

        .finally(() =>{

            setIsLoading(false)
        })

    }, []);
    
    return(
        <GlobalContext.Provider
        value={{
        isLoggedIn,
        isLoading,
        setIsLoading,
        user,
        setUser
        }}
        >
        {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;