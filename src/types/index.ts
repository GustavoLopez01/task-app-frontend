export type Errors = {
  msg: string
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

export type NewUser = {
  name: string
  age: number
  email: string
  password: string
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
  categoryId: number
}

export type NewTask = Omit<TaskBody, 'id'>

export type TasksResponse = {
  success: boolean
  tasks: TaskBody[]
}