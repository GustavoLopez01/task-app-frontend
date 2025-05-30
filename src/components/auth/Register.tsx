import type { FormEvent } from 'react'

type RegisterProps = {
  setIsLogin: (value: boolean) => void
}

const Register = ({ setIsLogin }: RegisterProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      className="p-4 space-y-4 font-montserrat-regular"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label
          className="font-montserrat-semibold"
          htmlFor="name"
        >
          Nombre
        </label>

        <input
          className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
          id="name"
          name="name"
          placeholder="Ingresa tu nombre"
          type="text"
        />
      </div>

      <div className="flex flex-col">
        <label
          className="font-montserrat-semibold"
          htmlFor="age"
        >
          Edad
        </label>

        <input
          className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
          id="age"
          name="age"
          placeholder="Ingresa tu edad"
          type="number"
          max={100}
        />
      </div>

      <div className="flex flex-col">
        <label
          className="font-montserrat-semibold"
          htmlFor="email"
        >
          Correo electrónico
        </label>

        <input
          className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
          id="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          type="email"
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
          className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
          id="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          type="password"
        />
      </div>

      <div className="flex flex-col">
        <label
          className="font-montserrat-semibold"
          htmlFor="repeatPassword"
        >
          Repite tu contraseña
        </label>

        <input
          className="outline-0 px-3 py-1 text-sm border-1 border-gray-400 rounded-full"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Repite la contraseña"
          type="password"
        />
      </div>

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
    </form>
  )
}

export default Register


