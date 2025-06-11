import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop
} from '@headlessui/react'
import { memo, lazy, useCallback, useEffect, Suspense } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import useStore from '@/store/store'
import InputWithLabel from '../inputs/InputWithLabel'
import { fetchSaveTask, fetchUpdateTask } from '@/api/task'
import type { NewTask } from '@/types'

const ErrorMessage = lazy(() => import('@/components/ErrorMessage'))

type AddTaskProps = {
  isOpen: boolean
  close: () => void
}

const AddTask = memo(({ isOpen, close }: AddTaskProps) => {
  const setTasks = useStore(state => state.setTasks)
  const setTaskToEdit = useStore(state => state.setTaskToEdit)
  const tasks = useStore(state => state.tasks)
  const categories = useStore(state => state.categories)
  const taskToEdit = useStore(state => state.taskToEdit)

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm<NewTask>()

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    if (!taskToEdit?.id) {
      await handleSaveTask(data)
    }
    await handleUpdateTask(data)
  }

  const handleSaveTask = async (data: NewTask) => {
    try {
      const body = {
        ...data,
        number: tasks.length + 1
      }
      const response = await fetchSaveTask(body)
      if (response?.success) {
        setTasks([...tasks, response.task])
        close()
        return
      }
    } catch (error) {
      console.error(`Ocurrió un error al crear la tarea ${error}`);
    }
  }

  const handleUpdateTask = async (data: NewTask) => {
    try {
      const response = await fetchUpdateTask({
        ...data
      }, taskToEdit?.id!)

      if (response?.success) {
        const updatedTasks = tasks.map(task => {
          if (task.id === response.task.id) {
            return response.task
          }
          return task
        })
        setTasks(updatedTasks)
        close()
        return
      }
    } catch (error) {
      console.error(`Ocurrió un error al actualizar la tarea ${error}`);
    }
  }

  const handleLoadTask = useCallback(() => {
    try {
      if (taskToEdit?.id) reset(taskToEdit)
    } catch (error) {
      console.error(`Ocurrió un error al mostrar la información de la tarea : ${error}`);
    }
  }, [taskToEdit?.id])

  useEffect(() => handleLoadTask(), [])

  return (
    <>
      <Dialog
        open={isOpen}
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

                    <Suspense fallback={<></>}>
                      <ErrorMessage
                        error={errors.description ? 'La descripción es obligatoria' : ''}
                      />
                    </Suspense>
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
                      {...register('categoryId', { required: true, valueAsNumber: true })}
                    >
                      <option value="">
                        --- Selecciona una opción ---
                      </option>
                      {categories.map(category => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <Suspense fallback={<></>}>
                      <ErrorMessage
                        error={errors.categoryId ? 'La categoria es obligatoria' : ''}
                      />
                    </Suspense>
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    className="items-center gap-2 rounded-md bg-gray-400 px-3 py-1.5 text-sm/6 font-semibold text-white font-montserrat-bold cursor-pointer hover:bg-gray-500"
                    onClick={() => {
                      setTaskToEdit(null)
                      close()
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
})

export default AddTask
