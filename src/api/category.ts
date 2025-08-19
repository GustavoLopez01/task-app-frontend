import { defaultResponse } from '@/helpers'
import { fetchJSON } from './fetchJson'
import { ResponseCategories } from '@/utils/schemas/schema'
import { ERROR_MESSAGES } from '@/constants/constants'
import type { CategoriesResponse } from '@/types'

export const fetchGetCategories = async (): Promise<CategoriesResponse> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/category`
    const response = await fetchJSON(URL, 'GET')
    const isValid = ResponseCategories.safeParse(response)
    if (isValid.success) return response

    return {
      ...defaultResponse(ERROR_MESSAGES.fetchGetCategories),
      categories: [],
      errors: []
    }
  } catch (error) {
    console.error(`Ocurrió un error - fetchGetCategories: ${error}`);
    return {
      ...defaultResponse(ERROR_MESSAGES.fetchGetCategories),
      categories: [],
      errors: []
    }
  }
}