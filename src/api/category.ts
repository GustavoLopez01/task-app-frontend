import { getHeaders } from '@/helpers'
import type { CategoriesResponse } from '@/types'

export const fetchGetCategories = async (): Promise<CategoriesResponse | undefined> => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/category`
    const response = await fetch(URL, {
      headers: getHeaders()
    })
    return await response.json()
  } catch (error) {
    console.error(`Ocurrió un error - fetchGetCategories: ${error}`);
  }
}