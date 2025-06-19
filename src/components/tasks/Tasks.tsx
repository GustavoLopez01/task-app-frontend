import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState
} from 'react'
import useStore from '@/store/store'
import Card from './Card'
import { 
  fetchCompletedTask, 
  fetchDeleteTask, 
  fetchGetTasks
} from '@/api/task'
import { fetchGetCategories } from '@/api/category'
import type { TaskBody } from '@/types'

const AddTask = lazy(() => import('@/components/modal/AddTask'))
const Alert = lazy(() => import('@/components/modal/Alert'))

export default function Tasks() {
  const tasks = useStore(state => state.tasks)
  const categories = useStore(state => state.categories)
  const task = useStore(state => state.task)
  const isOpen = useStore(state => state.isOpen)

  const setTasks = useStore(state => state.setTasks)
  const setCategories = useStore(state => state.setCategories)
  const setIsOpen = useStore(state => state.setIsOpen)

  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(0)

  const handleGetTasks = async () => {
    try {
      const response = await fetchGetTasks()
      if (response?.success) {
        setTasks(response.tasks)
        return
      }
    } catch (error) {
      console.error(`Ocurrió un error al obtener las tareas del usuario ${error}`);
    }
  }

  const handleGetCategories = async () => {
    try {
      const response = await fetchGetCategories()
      if (response?.success) {
        setCategories(response.categories)
        return
      }
    } catch (error) {
      console.error(`Ocurrió un error al obtener las categorias ${error}`);
    }
  }

  const handleDeleteTask = async () => {
    try {
      const response = await fetchDeleteTask(task.id)
      if (response?.success) {
        const updatedTasks = tasks.filter(currentTask => currentTask.id !== task.id)
        setTasks(updatedTasks)
        setIsOpenConfirmation(false)
      }
    } catch (error) {
      console.error(`Ocurrió un error al eliminar la tarea ${error}`);
    }
  }

  const handleCompleted = async (id: TaskBody['id']) => {
    try {
      const response = await fetchCompletedTask(id)
      if (response?.success) {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return {
              ...task,
              isCompleted: true
            }
          }
          return task
        })
        setTasks(updatedTasks)
      }
    } catch (error) {
      console.error(`Ocurrió un error al completar la tarea ${error}`);
    }
  }

  const tasksToShow = useMemo(() => {
    if (!currentCategory) return tasks
    return tasks.filter(task => task.categoryId === currentCategory) || []
  }, [currentCategory, tasks])

  useEffect(() => {
    handleGetTasks()
    handleGetCategories()
  }, [])

  return (
    <>
      {isOpen && (
        <Suspense fallback={<></>}>
          <AddTask
            close={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
          />
        </Suspense>
      )}

      {isOpenConfirmation && (
        <Suspense fallback={<></>}>
          <Alert
            isOpen={isOpenConfirmation}
            message={`¿Estas seguro de eliminar la tarea ${task.title}?`}
            handleAccept={handleDeleteTask}
            close={() => setIsOpenConfirmation(false)}
          />
        </Suspense>
      )}

      <div
        className={
          `flex flex-col p-5 h-full
          ${tasks.length === 0 ? 'justify-center items-center' : ''}
          `
        }
      >
        {tasks.length > 0 ? (
          <>
            <div className="flex flex-col lg:justify-between lg:flex-row">
              <h1 className="font-montserrat-bold uppercase text-2xl">
                mis tareas
              </h1>

              <div className="flex flex-col">
                <label
                  className="font-montserrat-semibold"
                  htmlFor="category"
                >
                  Filtrar por categoria
                </label>
                <select
                  className="border-1 border-gray-400 rounded-md py-1 outline-none px-1"
                  id="category"
                  onChange={(e) => setCurrentCategory(Number(e.target.value))}
                >
                  <option
                    value={0}
                  >
                    Todas las tareas
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
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-9 mt-2 overflow-y-auto">
              {tasksToShow.map((task) => (
                <Card
                  key={task.id}
                  task={task}
                  handleCompleted={(id: TaskBody['id']) => {
                    handleCompleted(id)
                  }}
                  setIsOpenConfirmation={setIsOpenConfirmation}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center flex flex-col font-montserrat-bold text-2xl py-3">
              Aún no tienes tareas
            </h2>
            <button
              className="bg-sky-600 text-white rounded-full transition py-2 px-4 text-md cursor-pointer hover:bg-sky-500"
              onClick={() => setIsOpen(true)}
            >
              + Agregar nueva tarea
            </button>
          </>
        )}
      </div>
    </>
  )
}
