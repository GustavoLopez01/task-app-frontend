import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop
} from '@headlessui/react'
import { memo, lazy } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { NewTask, TaskResponse } from '@/types'
import { fetchSaveTask } from '@/api/task'

const InputWithLabel = lazy(() => import('@/components/inputs/InputWithLabel'))
const ErrorMessage = lazy(() => import('@/components/ErrorMessage'))

type AddTaskProps = {
  isOpen: boolean
  close: () => void
}

const AddTask = memo(({ isOpen, close }: AddTaskProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<NewTask>()

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    try {
      const response: TaskResponse = await fetchSaveTask(data)
      if (response.success) {
        close()
        return
      }
    } catch (error) {
      console.error(`Ocurrió un error al guardar la tarea ${error}`);
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 font-montserrat-regular"
            >
              <DialogTitle as="h3" className="text-base/7 font-montserrat-bold text-center">
                Añade nueva tarea
              </DialogTitle>

              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col space-y-3">
                  <InputWithLabel
                    id="title"
                    type="text"
                    placeholder="Titulo"
                    label="Titulo"
                    register={register('title', { required: true })}
                    error={errors.title ? 'El titulo es obligatorio' : ''}
                  />

                  <div className="flex flex-col">
                    <label
                      htmlFor="description"
                      className="font-montserrat-semibold"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      className="outline-0 px-3 py-1 text-sm border-1 rounded-md border-gray-400 resize-none"
                      {...register('description', { required: true })}
                    />

                    <ErrorMessage
                      error={errors.description ? 'La descripción es obligatoria' : ''}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="category"
                      className="font-montserrat-semibold"
                    >
                      Categoria
                    </label>
                    <select
                      id="category"
                      className="border-1 border-gray-400 rounded-md py-1 outline-none"
                      {...register('categoryId', { required: true })}
                    >

                    </select>
                    <ErrorMessage
                      error={errors.categoryId ? 'La categoria es obligatoria' : ''}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    className="items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-sky-700"
                    type="submit"
                  >
                    Guardar
                  </Button>
                  <Button
                    className="items-center gap-2 rounded-md bg-gray-400 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-gray-500"
                    onClick={close}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
})

export default AddTask
