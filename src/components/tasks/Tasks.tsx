import { lazy, useEffect, useState } from 'react'
import { fetchGetTasks } from '@/api/task'
import type { TasksResponse, TaskBody } from '@/types'
const AddTask = lazy(() => import('@/components/modal/AddTask'))

export default function Tasks() {

  const [tasks, setTasks] = useState<TaskBody[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleGetTasks = async () => {
    try {
      const response: TasksResponse = await fetchGetTasks()
      if (response.success) {
        setTasks(response.tasks)
      }
    } catch (error) {
      console.error(`Ocurrió un error al obtener las tareas del usuario ${error}`);
    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <>
      {isOpen && (
        <AddTask
          close={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      )}

      <div className="flex flex-col p-5">
        <h1 className="font-montserrat-bold uppercase text-2xl">
          mis tareas
        </h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
        >
          Open
        </button>

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
            <tr>
              <td className="text-center">1</td>
              <td className="text-center">Limpiar la casa</td>
              <td className="text-center">Limpieza</td>
              <td className="text-center">
                <button className="cursor-pointer">
                  <span className="material-icons text-sky-600">
                    mode_edit
                  </span>
                </button>
                <button className="cursor-pointer">
                  <span className="material-icons text-red-600">
                    delete
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
