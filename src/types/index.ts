export type Errors = {
  msg: string
}
export type ErrorResponse = {
  success: boolean
  errors: string[]
}

export type AuthLogin = {
  email: string
  password: string
}

export type AuthLoginResponse = {
  success: boolean
  token: string
  message: string
}

export type UserBody = {
  id: number
  name: string
  age: number
  email: string
  password: string
}

export type NewUser = Omit<UserBody, 'id'> & {
  repeatPassword: string
}

export type NewUserResponse = {
  success: boolean
  user: Pick<NewUser, 'name' | 'email'> & {
    id: number
  }
  message: string
}

export type TaskBody = {
  id: number
  title: string
  description: string
  number: number
  isCompleted: boolean
  categoryId: number
  createdAt: string
  updatedAt: string
}

export type NewTask = Omit<TaskBody, 'id' | 'createdAt' | 'updatedAt'>

export type TaskResponse = {
  success: boolean
  errors: Errors[]
  task?: TaskBody
}

export type TasksResponse = {
  success: boolean
  tasks: TaskBody[]
}

export type Category = {
  id: number
  name: string
  description: string
}

export type CategoriesResponse = {
  success: boolean
  categories: Category[]
  errors: Errors[]
}

export type GeneralResponse = {
  success: boolean
  message: string
}

export type UserResponse = {
  success: boolean
  user?: UserBody
  errors: string[]
}