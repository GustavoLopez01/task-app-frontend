import { getHeaders } from '@/helpers'
import type { NewTask } from '@/types'

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

export const fetchSaveTask = async (task: NewTask) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response = await fetch(URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task)
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchSaveTask: ${error}`);
  }
}