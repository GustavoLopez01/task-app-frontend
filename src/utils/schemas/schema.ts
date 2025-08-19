import * as z from 'zod'

export const ResponseGeneral = z.object({
  success: z.boolean(),
  message: z.string(),
})

export const ResponseLogin = z.object({
  success: z.boolean(),
  token: z.string(),
})

export const ResponseSaveTask = z.object({
  success: z.boolean(),
  errors: z.array(z.object({ msg: z.string().optional() })).optional()
})

export const ResponseTasks = z.object({
  success: z.boolean(),
  tasks: z.array(z.object({
    id: z.number(),
    description: z.string(),
    title: z.string(),
    isCompleted: z.boolean()
  })).min(0)
})

export const ResponseCategories = z.object({
  success: z.boolean(),
  categories: z.array(z.object({
    id: z.number(),
    description: z.string(),
    name: z.string(),
  })).min(0)
})

export const ResponseGetUser = z.object({
  success: z.boolean(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    age: z.number(),
    email: z.string()
  })
})
