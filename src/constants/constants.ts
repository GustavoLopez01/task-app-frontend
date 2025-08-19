export const ROUTES = [
  { label: 'Mis tareas', link: 'tasks', icon: 'task' },
  { label: 'Agregar nueva tarea', link: 'add-task', icon: 'add_circle' },
  { label: 'Perfil', link: 'profile', icon: 'person' },
]

export const ERROR_MESSAGES = {
  authLogin: 'Ocurrió un error al autenticar el usuario.',
  registerUser: 'Ocurrió un error al registrar al usuario.',
  isAuth: 'Ocurrió un error al autenticar el usuario.',
  fetchGetCategories: 'Ocurrió un error al obtener las categorias.',
  fetchGetTasks: 'Ocurrió un error al obtener las tareas.',
  fetchSaveTask: 'Ocurrió un error al guardar la tarea.',
  fetchUpdateTask: 'Ocurrió un error al actualizar la tarea.',
  fetchCompletedTask: 'Ocurrió un error al completar la tarea.',
  fetchDeleteTask: 'Ocurrió un error al eliminar la tarea.',
  getUser: 'Ocurrió un error al obtener al usuario.',
  updateUser: 'Ocurrió un error al actualizar al usuario.',
}