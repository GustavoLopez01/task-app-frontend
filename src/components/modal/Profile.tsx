import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react"
import { useForm, type SubmitHandler } from 'react-hook-form'
import useStore from '@/store/store'
import InputWithLabel from '../inputs/InputWithLabel'
import type { UserBody } from '@/types'
import { updateUser } from "@/api/user"

const Profile = () => {
  const setIsOpenProfile = useStore(state => state.setIsOpenProfile)
  const isOpenProfile = useStore(state => state.isOpenProfile)
  const user = useStore(state => state.user)

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm<UserBody>({
    defaultValues: user
  })

  const onSubmit: SubmitHandler<UserBody> = async (data) => {
    const response = await updateUser(data)
    console.log(response);

  }

  return (
    <>
      <Dialog
        open={isOpenProfile}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => { }}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-montserrat-regular"
            >
              <DialogTitle as="h3" className="font-montserrat-bold text-center">
                Mis datos
              </DialogTitle>

              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col space-y-3">
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
                    register={register('age', { required: true, valueAsNumber: true })}
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
                    error={errors.email ? 'El nombre es obligatorio' : ''}
                  />

                  <InputWithLabel
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    label="Contraseña"
                    register={register('password', { required: true })}
                    error={errors.password ? 'La contraseña es obligatoria' : ''}
                  />

                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    className="items-center gap-2 rounded-md bg-gray-400 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-gray-500"
                    onClick={() => {
                      setIsOpenProfile(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-sky-700"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Profile