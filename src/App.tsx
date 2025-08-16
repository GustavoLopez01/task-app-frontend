import { useState } from 'react'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import useAuth from './hooks/useAuth'
import AuthContext from './context/AuthContext'
import Dashboard from './components/layout/Dashboard'

function App() {
  const { 
    isAuthenticate, 
    resetAuth, 
    setIsAuthenticate
  } = useAuth()
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticate,
        setIsAuthenticate,
        resetAuth
      }}
    >
      <main className="h-screen">
        {isAuthenticate ? (
          <Dashboard />
        ) : (
          <ContainerAuth />
        )}
      </main>
    </AuthContext.Provider>
  )
}

const ContainerAuth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="h-full flex justify-center items-center mx-5">
      <div className="bg-white py-10 rounded-md shadow-2xl w-[400px] min-h-[200px]">
        {isLogin ? (
          <Login
            setIsLogin={setIsLogin}
          />
        ) : (
          <Register
            setIsLogin={setIsLogin}
          />
        )}
      </div>
    </div>
  )
}

export default App
