import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useStore from '@/store/store'
import { getUser } from '@/api/user'
import { ROUTES } from '@/constants/constants'
import useAuthenticate from '@/hooks/useAuthenticate'

type SidebarProps = {
  showNavbar: boolean
}

export const Sidebar = ({ showNavbar }: SidebarProps) => {
  const { resetAuth } = useAuthenticate()
  const navigate = useNavigate()
  const setUser = useStore(state => state.setUser)
  const setIsOpenProfile = useStore(state => state.setIsOpenProfile)
  const setIsOpen = useStore(state => state.setIsOpen)

  const handleNavigation = (link: string) => {
    switch (link) {
      case 'tasks':
        navigate(link)
        break
      case 'add-task':
        setIsOpen(true)
        break
      case 'profile':
        setIsOpenProfile(true)
        break
      default:
        break
    }
  }

  const handleGetUser = async () => {
    const response = await getUser()
    if (response?.success) {
      setUser(response.user)
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    resetAuth()
    navigate('/')
  }

  useEffect(() => {
    handleGetUser()
  }, [])

  return (
    <div
      className={`${showNavbar ? 'fixed' : 'hidden'} max-w-xs min-w-xs font-montserrat-regular border-r-1 border-gray-200 h-full lg:flex flex-col shadow-xl bg-white flex z-10
      `}
    >
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
              handleNavigation(route.link)
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
        <button
          onClick={handleLogout}
          className="text-center w-full cursor-pointer flex items-center justify-center gap-2 bg-sky-600 py-2 rounded-full text-white font-montserrat-bold transition hover:bg-sky-500">
          <span className="material-icons rotate-180">logout</span>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
