import { getHeaders } from '@/helpers'
import type {
  NewTask,
  GeneralResponse,
  TasksResponse,
  TaskResponse,
  TaskBody
} from '@/types'

export const fetchGetTasks = async (): Promise<TasksResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response = await fetch(URL, {
      headers: getHeaders()
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchGetTasks: ${error}`)
  }
}

export const fetchSaveTask = async (task: NewTask): Promise<TaskResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response = await fetch(URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task)
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchSaveTask: ${error}`)
  }
}

export const fetchUpdateTask = async (task: TaskBody): Promise<TaskResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task/${task.id}`
    const response = await fetch(URL, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(task)
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchUpdateTask: ${error}`)
  }
}

export const fetchDeleteTask = async (id: number): Promise<GeneralResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task/${id}`
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error fetchDeleteTask - ${error}`)
  }
}