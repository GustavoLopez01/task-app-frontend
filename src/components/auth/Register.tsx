import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { InputWithLabel } from '@/components/inputs/InputWithLabel'
import { registerUser } from '@/api/Auth'
import type { NewUser, NewUserResponse } from '@/types'

type RegisterProps = {
  setIsLogin: (value: boolean) => void
}

const Register = ({ setIsLogin }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewUser>({
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      repeatPassword: ''
    }
  })
  const [errorResponse, setErrorResponse] = useState('')

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    const { password, repeatPassword } = data
    if (password.trim() !== repeatPassword.trim()) {
      setError('repeatPassword', {})
      return
    }

    try {
      const response: NewUserResponse = await registerUser(data)
      if (response.success) {
        console.log(response.user);
        return
      }
      setErrorResponse(response.message)
    } catch (error) {
      console.error(`Ocurrió un error al registrar al usuario ${error}`);
    }
  }

  return (
    <form
      className="p-4 space-y-4 font-montserrat-regular"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWithLabel
        id="name"
        type="text"
        placeholder="Ingresa tu nombre"
        label="Nombre"
        register={register('name', { required: true })}
        error={errors.name ? 'El nombre es obligatorio' : ''}
      />

      <InputWithLabel
        id="age"
        type="number"
        placeholder="Ingresa tu edad"
        label="Edad"
        register={register('age', { required: true, min: 10, valueAsNumber: true })}
        error={errors.age ? 'La edad debe ser mayor a 10 años' : ''}
      />

      <InputWithLabel
        id="email"
        type="text"
        placeholder="Ingresa tu correo electrónico"
        label="Correo electrónico"
        register={register('email',
          {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
        error={errors.email ? 'El correo electrónico debe ser valido.' : ''}
      />

      <InputWithLabel
        id="password"
        type="text"
        placeholder="Ingresa tu contraseña"
        label="Contraseña"
        register={register('password', { required: true })}
        error={errors.password ? 'La contraseña es obligatoria.' : ''}
      />

      <InputWithLabel
        id="repeatPassword"
        type="text"
        placeholder="Repita la contraseña"
        label="Repite tu contraseña"
        register={register('repeatPassword', { required: true })}
        error={errors.repeatPassword ? 'La contraseña no coincide con la original.' : ''}
      />

      <button
        className="w-full bg-sky-600 font-montserrat-bold rounded-full px-2 py-2 text-white hover:bg-sky-700 cursor-pointer"
        type="submit"
      >
        Registrate
      </button>

      <p className="text-center">
        ¿Ya tienes una cuenta?
        <span
          className="px-1 underline font-semibold cursor-pointer"
          onClick={() => setIsLogin(true)}
        >
          Inicia sesión
        </span>
      </p>

      {errorResponse && <p className="bg-red-500 w-full text-white text-center text-sm py-1 font-montserrat-bold"> {errorResponse} </p>}
    </form>
  )
}

export default Register


