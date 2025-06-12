import { getHeaders } from '@/helpers'
import type { UserResponse, UserBody } from '@/types/index'

export const getUser = async (): Promise<UserResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/get-user`
    const response = await fetch(URL, {
      headers: getHeaders()
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - getUser: ${error}`);
  }
}

export const updateUser = async (user: UserBody): Promise<UserBody | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`
    const response = await fetch(URL, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - updateUser: ${error}`);
  }
}