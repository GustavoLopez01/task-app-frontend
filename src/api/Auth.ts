import type { AuthLogin } from '../types/index'

export const authLogin = async (auth: AuthLogin) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(auth),
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error al autenticar el usuario`);
  }
}