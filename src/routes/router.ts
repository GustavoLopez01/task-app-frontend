import { createBrowserRouter } from 'react-router'
import App from '@/App'
import Dashboard from '@/components/layout/Dashboard'
import Tasks from '@/components/tasks/Tasks'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    index: true
  },
  {
    path: "dashboard",
    children: [
      {
        Component: Dashboard,
        children: [
          { path: "tasks", Component: Tasks }
        ]
      }
    ]
  }
])

export default router