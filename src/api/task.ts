import { getHeaders } from '@/helpers'

export const fetchGetTasks = async () => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response = await fetch(URL, {
      headers: getHeaders()
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchGetTasks: ${error}`);
  }
}