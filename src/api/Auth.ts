import { getHeaders } from '@/helpers'
import type { AuthLogin, NewUser } from '@/types/index'

export const authLogin = async (auth: AuthLogin) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
    const response = await fetch(URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(auth),
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error al autenticar el usuario ${error}`)
  }
}

export const registerUser = async (user: NewUser) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user`
    const response = await fetch(URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error al registrar al usuario ${error}`)
  }
}