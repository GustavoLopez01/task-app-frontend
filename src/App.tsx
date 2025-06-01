import { useState } from 'react'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

function App() {
  return (
    <main className="h-screen">
      <ContainerAuth />
    </main>
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
