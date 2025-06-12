import { create } from 'zustand'
import type { TaskBody, Category, UserBody } from '@/types'

type State = {
  tasks: TaskBody[]
  taskToEdit: TaskBody | null
  categories: Category[]
  isOpen: boolean
  isOpenProfile: boolean
  task: {
    id: number
    title: string
  }
  user: UserBody
}

type Action = {
  setIsOpen: (isOpen: boolean) => void
  setTasks: (tasks: TaskBody[]) => void
  setTaskToEdit: (taskToEdit: TaskBody | null) => void
  setCategories: (categories: Category[]) => void
  setTask: (task: { id: number, title: string }) => void
  setIsOpenProfile: (isOpenProfile: boolean) => void
  setUser: (user: UserBody) => void
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
  user: {
    id: 0,
    age: 0,
    email: '',
    name: '',
    password: ''
  },
  isOpen: false,
  isOpenProfile: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  setTaskToEdit: (taskToEdit) => set(() => ({ taskToEdit })),
  setTasks: (tasks) => set(() => ({ tasks })),
  setTask: (task) => set(() => ({ task })),
  setCategories: (categories) => set(() => ({ categories })),
  setIsOpenProfile: (isOpenProfile) => set(() => ({ isOpenProfile })),
  setUser: (user) => set(() => ({ user }))
}))

export default useStore