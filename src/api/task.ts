import { defaultResponse } from '@/helpers'
import type {
  NewTask,
  GeneralResponse,
  TasksResponse,
  TaskResponse,
  TaskBody,
} from '@/types'
import { fetchJSON } from './fetchJson'
import { 
  ResponseGeneral, 
  ResponseSaveTask, 
  ResponseTasks
} from '@/utils/schemas/schema'
import { ERROR_MESSAGES } from '@/constants/constants'

export const fetchGetTasks = async (): Promise<TasksResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response = await fetchJSON(URL, 'GET')
    const isValid = ResponseTasks.safeParse(response)
    if (isValid.success) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchGetTasks),
      tasks: []
    }
  } catch (error) {
    console.error(`Ocurrió un error - fetchGetTasks: ${error}`)
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchGetTasks),
      tasks: []
    }
  }
}

export const fetchSaveTask = async (task: NewTask): Promise<TaskResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task`
    const response: TaskResponse = await fetchJSON(URL, 'POST', task)
    const isValid = ResponseSaveTask.safeParse(response)
    if (isValid.success) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchSaveTask),
      errors: response.errors,
    }
  } catch (error) {
    console.error(`Ocurrió un error - fetchSaveTask: ${error}`)
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchSaveTask),
      errors: [{ msg: ERROR_MESSAGES.fetchSaveTask }],
    }
  }
}

export const fetchUpdateTask = async (task: NewTask, id: number): Promise<TaskResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task/${id}`
    const response: TaskResponse = await fetchJSON(URL, 'PUT', task)
    const isValid = ResponseSaveTask.safeParse(response)
    if (isValid.success) return response
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchUpdateTask),
      errors: response.errors
    }
  } catch (error) {
    console.error(`Ocurrió un error - fetchUpdateTask: ${error}`)
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchUpdateTask),
      errors: [{ msg: ERROR_MESSAGES.fetchUpdateTask }]
    }
  }
}

export const fetchCompletedTask = async (id: TaskBody['id']): Promise<GeneralResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task/completed-task`
    const response = await fetchJSON(URL, 'PUT', { id })
    const isValid = ResponseGeneral.safeParse(response)
    if (isValid.success) return response
    return defaultResponse(ERROR_MESSAGES.fetchCompletedTask)
  } catch (error) {
    console.error(`Ocurrió un error - fetchCompletedTask: ${error}`)
    return defaultResponse(ERROR_MESSAGES.fetchCompletedTask)
  }
}

export const fetchDeleteTask = async (id: number): Promise<GeneralResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/task/${id}`
    const response = await fetchJSON(URL, 'DELETE')
    const isValid = ResponseGeneral.safeParse(response)
    if (isValid.success) return response
    return defaultResponse(ERROR_MESSAGES.fetchDeleteTask)
  } catch (error) {
    console.error(`Ocurrió un error fetchDeleteTask - ${error}`)
    return defaultResponse(ERROR_MESSAGES.fetchDeleteTask)
  }
}