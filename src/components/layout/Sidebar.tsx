import { useNavigate, NavLink } from 'react-router'
import { ROUTES } from '@/constants/constants'
import useStore from '@/store/store'

export const Sidebar = () => {
  const navigate = useNavigate()

  const setIsOpen = useStore(state => state.setIsOpen)

  return (
    <div className="max-w-xs min-w-xs font-montserrat-regular border-r-1 border-gray-200 h-full flex flex-col shadow-xl">
      <h1 className="font-montserrat-bold text-2xl text-center py-3 text-sky-700">
        Task App
      </h1>

      <nav className="flex flex-col gap-6 flex-1 px-5">
        {ROUTES.map((route) => (
          <button
            key={route.icon}
            className="cursor-pointer flex items-center text-left justify-center gap-3 py-2 rounded-full transition-all text-sky-600 hover:bg-sky-700 hover:text-white"
            onClick={() => {
              if (window.location.pathname.includes(route.link)) return

              if (!route.link.includes('add-task')) {
                navigate(route.link)
                return
              }
              setIsOpen(true)
            }}
          >
            <span className="material-icons hover:text-white">{route.icon}</span>
            <span className="w-[170px]">
              {route.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="h-20 px-5">
        <NavLink
          to="/"
          className="text-center w-full cursor-pointer flex items-center justify-center gap-2 bg-sky-600 py-2 rounded-full text-white font-montserrat-bold transition hover:bg-sky-500">
          <span className="material-icons rotate-180">logout</span>
          Cerrar sesión
        </NavLink>
      </div>
    </div>
  )
}
