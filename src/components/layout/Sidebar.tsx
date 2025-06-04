import { ROUTES } from '@/constants/constants'

export const Sidebar = () => {
  return (
    <div className="max-w-xs font-montserrat-regular border-r-1 border-gray-200 h-full flex flex-col shadow-xl">
      <h1 className="font-montserrat-bold text-2xl text-center py-3 text-sky-700">
        Task App
      </h1>

      <div className="flex flex-col gap-6 flex-1 px-5">
        {ROUTES.map((route) => (
          <button
            key={route.icon}
            className="cursor-pointer flex items-center text-left justify-center gap-3 py-2 rounded-full text-sky-600 hover:bg-sky-700 hover:text-white">
            <span className="material-icons hover:text-white">{route.icon}</span>
            <span className="w-[170px]">
              {route.label}
            </span>
          </button>
        ))}
      </div>

      <div className="h-20 px-5">
        <button
          className="text-center w-full cursor-pointer flex items-center justify-center gap-2 bg-sky-600 py-2 rounded-full text-white font-montserrat-bold transition hover:bg-sky-500">
          <span className="material-icons rotate-180">logout</span>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
