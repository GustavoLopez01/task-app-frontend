import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import type { AuthLogin } from '../../types'
import { authLogin } from '../../api/Auth'

const Login = () => {
  const [auth, setAuth] = useState<AuthLogin>({
    email: '',
    password: ''
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const response = await authLogin(auth)
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
    <div className="h-full flex justify-center items-center mx-5">
      <div className="bg-white rounded-md shadow-2xl w-[400px] min-h-[200px] py-4">
        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 font-montserrat-regular"
          autoComplete="off"
        >
          <h3 className="text-center text-2xl font-montserrat-bold">
            Iniciar sesión
          </h3>
          <div className="flex flex-col">
            <label
              className="font-montserrat-semibold"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="outline-0 px-3 py-1 border-1 border-gray-400 rounded-full"
              id="email"
              name="email"
              placeholder="Ingresa tu correo electrónico"
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="font-montserrat-semibold"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="outline-0 px-2 py-1 border-1 border-gray-400 rounded-full"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              type="password"
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-sky-600 font-montserrat-bold rounded-full px-2 py-2 text-white hover:bg-sky-700 cursor-pointer">
            Inicia sesión
          </button>

          <p className="text-center">
            ¿Aún no tienes cuenta?
            <span className="px-1 underline font-semibold cursor-pointer">
              Registrate aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}


export default Login