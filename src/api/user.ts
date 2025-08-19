import { fetchJSON } from './fetchJson'
import { defaultResponse } from '@/helpers'
import { ResponseGetUser } from '@/utils/schemas/schema'
import { ERROR_MESSAGES } from '@/constants/constants'
import type { UserResponse, UserBody } from '@/types/index'

export const getUser = async (): Promise<UserResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/get-user`
    const response = await fetchJSON(URL, 'GET')
    const isValid = ResponseGetUser.safeParse(response)
    if (isValid) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.getUser),
      errors: [ERROR_MESSAGES.getUser]
    }
  } catch (error) {
    console.error(`Ocurrió un error - getUser: ${error}`);
    return {
      ...defaultResponse(ERROR_MESSAGES.getUser),
      errors: [ERROR_MESSAGES.getUser]
    }
  }
}

export const updateUser = async (user: UserBody): Promise<UserResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`
    const response = await fetchJSON(URL, 'PUT', user)    
    const isValid = ResponseGetUser.safeParse(response)
    if (isValid.success) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.getUser),
      errors: [ERROR_MESSAGES.getUser]
    }
  } catch (error) {
    console.error(`Ocurrió un error - updateUser: ${error}`)
    return {
      ...defaultResponse(ERROR_MESSAGES.getUser),
      errors: [ERROR_MESSAGES.getUser]
    }
  }
}