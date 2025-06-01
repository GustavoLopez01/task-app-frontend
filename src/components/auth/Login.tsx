import { useForm, type SubmitHandler } from 'react-hook-form'
import { InputWithLabel } from '../inputs/InputWithLabel'
import { authLogin } from '../../api/Auth'
import type { AuthLogin, AuthLoginResponse } from '../../types'
import { useState } from 'react'

type LoginProps = {
  setIsLogin: (value: boolean) => void
}

const Login = ({ setIsLogin }: LoginProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit } = useForm<AuthLogin>({
      defaultValues: {
        email: '',
        password: ''
      }
    })

  const [errorResponse, setErrorResponse] = useState('')

  const onSubmit: SubmitHandler<AuthLogin> = async (data) => {
    try {
      const response: AuthLoginResponse = await authLogin(data)
      if (response.success) {
        document.cookie = `token=${response.token}`
        return
      }
      setErrorResponse(response.message)
    } catch (error) {
      console.error(`Ocurrió un error al autenticar al usuario`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        error={errors.email ? 'El correo electrónico es obligatorio' : ''}
        register={register('email', { required: true })}
      />

      <InputWithLabel
        id="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        label="Contraseña"
        error={errors.password ? 'La contraseña es obligatoria' : ''}
        register={register('password', { required: true })}
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

      {errorResponse && <p className="bg-red-500 w-full text-white text-center text-sm py-1 font-montserrat-bold"> {errorResponse} </p>}
    </form>
  )
}


export default Login