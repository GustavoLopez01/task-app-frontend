import { getHeaders } from "@/helpers"

export const fetchJSON = async (
  url: string,
  method: string,
  body?: unknown
) => {
  try {
    const headers = getHeaders()
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    })

    const data = await response.json()
    
    if(!data.success) {
      window.location.href = `${window.location.host}/`
      return
    }

    return data
  } catch (error) {
    console.error(`Ocurrió un error al realizar la petición: ${error}`)
  }
}