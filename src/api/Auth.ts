import {
  ResponseGeneral,
  ResponseLogin
} from '@/utils/schemas/schema'
import { fetchJSON } from './fetchJson'
import type {
  AuthLogin,
  AuthLoginResponse,
  GeneralResponse,
  NewUser
} from '@/types/index'
import { defaultResponse } from '@/helpers'
import { ERROR_MESSAGES } from '@/constants/constants'

export const authLogin = async (auth: AuthLogin): Promise<AuthLoginResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
    const response = await fetchJSON(URL, 'POST', auth)
    const isValid = ResponseLogin.safeParse(response)
    if (isValid.success) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.authLogin),
      token: ''
    }
  } catch (error) {
    console.error(`${ERROR_MESSAGES.authLogin} ${error}`)
    return {
      ...defaultResponse(ERROR_MESSAGES.authLogin),
      token: ''
    }
  }
}

export const registerUser = async (user: NewUser): Promise<GeneralResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user`
    const response = await fetchJSON(URL, 'POST', user)
    const isValid = ResponseGeneral.safeParse(response)
    if (isValid.success) return response
    return defaultResponse(ERROR_MESSAGES.registerUser)
  } catch (error) {
    console.error(`${ERROR_MESSAGES.registerUser} ${error}`)
    return defaultResponse(ERROR_MESSAGES.registerUser)
  }
}

export const isAuth = async (): Promise<GeneralResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/isAuth`
    const response = await fetchJSON(URL, 'GET')
    const isValid = ResponseGeneral.safeParse(response)
    if (isValid.success) return response
    return defaultResponse(ERROR_MESSAGES.isAuth)
  } catch (error) {
    console.error(`${ERROR_MESSAGES.isAuth} ${error}`)
    return defaultResponse(ERROR_MESSAGES.isAuth)
  }
}