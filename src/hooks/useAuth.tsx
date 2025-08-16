import { isAuth } from '@/api/auth'
import { useEffect, useState } from 'react'

export default function useAuth() {
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  const isAuthenticateUser = async () => {
    const response = await isAuth()
    if (response?.success) {
      setIsAuthenticate(response.success)
    }
  }

  const resetAuth = () => {
    setIsAuthenticate(false)
  }

  useEffect(() => {
    isAuthenticateUser()
  }, [])

  return {
    isAuthenticate,
    setIsAuthenticate,
    resetAuth,
  }
}