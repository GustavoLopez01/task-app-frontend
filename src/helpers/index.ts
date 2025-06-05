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