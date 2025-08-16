import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const useAuthenticate = () => useContext(AuthContext)

export default useAuthenticate