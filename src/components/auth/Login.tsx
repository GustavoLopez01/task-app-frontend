import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import type { AuthLogin, AuthLoginResponse } from '../../types'
import { authLogin } from '../../api/Auth'
import { InputWithLabel } from '../inputs/InputWithLabel'

type LoginProps = {
  setIsLogin: (value: boolean) => void
}

const Login = ({ setIsLogin }: LoginProps) => {
  const [auth, setAuth] = useState<AuthLogin>({
    email: '',
    password: ''
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const response: AuthLoginResponse = await authLogin(auth)
      if (response.success) {
        document.cookie = `token=${response.token}`
      }
    } catch (error) {
      console.error(`Ocurrió un error al autenticar al usuario`);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAuth({
      ...auth,
      [name]: value
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 font-montserrat-regular"
      autoComplete="off"
    >
      <h3 className="text-center text-2xl font-montserrat-bold">
        Iniciar sesión
      </h3>

      <InputWithLabel
        id="email"
        type="text"
        placeholder="Ingresa tu correo electrónico"
        label="Correo electrónico"
        handleChange={handleChange}
      />

      <InputWithLabel
        id="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        label="Contraseña"
        handleChange={handleChange}
      />

      <button
        className="w-full bg-sky-600 font-montserrat-bold rounded-full px-2 py-2 text-white hover:bg-sky-700 cursor-pointer"
        type="submit"
      >
        Inicia sesión
      </button>

      <p className="text-center">
        ¿Aún no tienes cuenta?
        <span
          className="px-1 underline font-semibold cursor-pointer"
          onClick={() => setIsLogin(false)}
        >
          Registrate aquí
        </span>
      </p>
    </form>
  )
}


export default Login