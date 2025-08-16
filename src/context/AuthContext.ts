import { createContext } from 'react'

type AuthContextType = {
  isAuthenticate: boolean
  resetAuth: () => void
  setIsAuthenticate: (isAuth: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticate: false,
  setIsAuthenticate: () => { },
  resetAuth: () => { },
})

export default AuthContext