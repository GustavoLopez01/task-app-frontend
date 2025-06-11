import { create } from 'zustand'
import type { TaskBody, Category } from '@/types'

type State = {
  tasks: TaskBody[]
  taskToEdit: TaskBody | null
  categories: Category[]
  task: {
    id: number
    title: string
  }
  isOpen: boolean
}

type Action = {
  setIsOpen: (isOpen: boolean) => void
  setTasks: (tasks: TaskBody[]) => void
  setTaskToEdit: (taskToEdit: TaskBody | null) => void
  setCategories: (categories: Category[]) => void
  setTask: (task: { id: number, title: string }) => void
}

const useStore = create<State & Action>()((set) => ({
  tasks: [],
  taskToEdit: {
    categoryId: 0,
    description: '',
    number: 1,
    id: 0,
    isCompleted: false,
    title: '',
    createdAt: '',
    updatedAt: ''
  },
  categories: [],
  task: {
    id: 0,
    title: ''
  },
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setTaskToEdit: (taskToEdit) => set(() => ({ taskToEdit })),
  setTasks: (tasks) => set(() => ({ tasks })),
  setTask: (task) => set(() => ({ task })),
  setCategories: (categories) => set(() => ({ categories }))
}))

export default useStore