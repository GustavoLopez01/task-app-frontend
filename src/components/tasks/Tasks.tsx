import { 
  lazy, 
  useCallback, 
  useEffect, 
  useMemo, 
  useState
} from 'react'
import useStore from '@/store/store'
import { fetchDeleteTask, fetchGetTasks } from '@/api/task'
import { fetchGetCategories } from '@/api/category'

const AddTask = lazy(() => import('@/components/modal/AddTask'))
const Alert = lazy(() => import('@/components/modal/Alert'))

export default function Tasks() {
  const tasks = useStore(state => state.tasks)
  const categories = useStore(state => state.categories)
  const task = useStore(state => state.task)
  const isOpen = useStore(state => state.isOpen)

  const setTasks = useStore(state => state.setTasks)
  const setCategories = useStore(state => state.setCategories)
  const setTaskToEdit = useStore(state => state.setTaskToEdit)
  const setTask = useStore(state => state.setTask)
  const setIsOpen = useStore(state => state.setIsOpen)

  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(1)

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

  const getCategoryName = useCallback((id: number) => {
    return categories.find(category => category.id === id)?.name
  }, [categories])

  const tasksToShow = useMemo(() => {
    if(!currentCategory) return tasks
    return tasks.filter(task => task.categoryId === currentCategory) || []
  }, [currentCategory, tasks])

  useEffect(() => {
    handleGetTasks()
    handleGetCategories()
  }, [])

  return (
    <>
      {isOpen && (
        <AddTask
          close={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}

      {isOpenConfirmation && (
        <Alert
          isOpen={isOpenConfirmation}
          message={`¿Estas seguro de eliminar la tarea ${task.title}?`}
          handleAccept={handleDeleteTask}
          close={() => setIsOpenConfirmation(false)}
        />
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
            <div className="flex justify-between">
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
              </div>

            </div>
            <table className="mt-6">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Titulo</th>
                  <th>Categoria</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasksToShow.map((task, index) => (
                  <tr
                    key={`task-${task.id}`}
                    className={
                      `h-14 ${index % 2 !== 0 ? 'bg-sky-100' : ''}`
                    }
                  >
                    <td className="text-center"> {index + 1} </td>
                    <td className="text-center"> {task.title} </td>
                    <td className="text-center">
                      <span className="bg-orange-500 rounded-full py-1 px-3 text-white font-montserrat-bold cursor-pointer">
                        {getCategoryName(task.categoryId)}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setTaskToEdit(task)
                          setIsOpen(true)
                        }}
                      >
                        <span className="material-icons text-sky-600 hover:text-sky-500">
                          mode_edit
                        </span>
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setTask(task)
                          setIsOpenConfirmation(true)
                        }}
                      >
                        <span className="material-icons text-red-600 hover:text-red-500">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
