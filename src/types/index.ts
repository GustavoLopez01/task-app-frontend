export type AuthLogin = {
  email: string
  password: string
}

export type AuthLoginResponse = {
  success: boolean
  token: string
}