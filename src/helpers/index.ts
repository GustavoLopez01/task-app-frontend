export const getHeaders = () => {
  return {
    'Content-type': 'application/json',
    'token-x': getItemFromStorage('sessionStorage', 'token')
  }
}

export const getItemFromStorage = (storage: string, key: string): string => {
  if (storage.includes('localStorage')) {
    return localStorage.getItem(key) || ''
  }
  return sessionStorage.getItem(key) || ''
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
export const changeChainString = (text: string): string => {
  return text.length > 25 ? `${text.substring(0, 25)}...` : text 
}