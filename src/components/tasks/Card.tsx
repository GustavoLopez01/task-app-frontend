import { useMemo } from 'react'
import useStore from '@/store/store'
import { changeChainString, formatDate } from '@/helpers'
import type { TaskBody } from '@/types'

type CardProps = {
  task: TaskBody
  handleCompleted: (id: TaskBody['id']) => void
  setIsOpenConfirmation: (isOpenConfirmation: boolean) => void
}

export default function Card({
  task,
  handleCompleted,
  setIsOpenConfirmation
}: CardProps) {
  const categories = useStore(state => state.categories)
  const setTaskToEdit = useStore(state => state.setTaskToEdit)
  const setTask = useStore(state => state.setTask)
  const setIsOpen = useStore(state => state.setIsOpen)

  const categoryName = useMemo(() => {
    return categories.find(category => category.id === task.categoryId)?.name
  }, [task.id, categories])

  return (
    <div
      className="rounded-md w-96 shadow px-5 py-3 space-y-1 flex flex-col border-1 border-gray-300"
    >
      <p className="font-montserrat-bold text-[18px]">
        {changeChainString(task.title)}
      </p>
      <span> {task.description} </span>
      <p>
        Fecha de creación : {""}
        <span className="font-montserrat-bold">
          {formatDate(task.createdAt)}
        </span>
      </p>
      <p>
        Fecha de actualización : {""}
        <span className="font-montserrat-bold">
          {formatDate(task.updatedAt)}
        </span>
      </p>

      <p>
        Categoría: {""}
        <span className="bg-amber-500 w-32 text-center rounded-full text-white font-montserrat-bold py-1 px-4">
          {categoryName}
        </span>
      </p>

      <div
        className={`flex gap-3 justify-center mt-3 
          ${task.isCompleted ? 'opacity-50 pointer-events-none' : ''}`
        }
      >
        <button className="bg-sky-500 outline-none px-2 py-1 rounded-md cursor-pointer flex items-center">
          <span
            className="material-icons text-white"
            onClick={() => {
              setIsOpen(true)
              setTaskToEdit(task)
            }}
          >
            mode_edit
          </span>
        </button>
        <button
          className="bg-red-500 outline-none px-2 py-1 rounded-md cursor-pointer flex items-center"
          onClick={() => {
            setTask(task)
            setIsOpenConfirmation(true)
          }}
        >
          <span className="material-icons text-white">
            delete
          </span>
        </button>
        <button
          className="bg-green-500 outline-none px-2 py-1 rounded-md cursor-pointer flex items-center"
          onClick={() => handleCompleted(task.id)}
        >
          <span className="material-icons text-white">
            check
          </span>
        </button>
      </div>
    </div>
  )
}
