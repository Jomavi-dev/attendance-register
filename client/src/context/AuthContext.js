import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../services/AuthService'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    AuthService.isAuth().then(data => {
      setUser(data.user)
      setIsAuth(data.isAuthenticated)
      setIsLoaded(true)
    })
  }, [])

  return (
    <div>
      {
        !isLoaded
          ? (
            {/* <div className="loader__wrapper">
              <Loader type="Circles" color="#00BFFF" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                background: "white",
                height: "500% !important"

              }} height={632} width={80} />
            </div> */}
          ) : (
            <AuthContext.Provider value={{
              user,
              setUser,
              isAuth,
              setIsAuth
            }}>
              {children}
            </AuthContext.Provider>
          )
      }
    </div >
  )
}

export default AuthProvider