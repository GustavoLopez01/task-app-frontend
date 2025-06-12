import { useState } from 'react'
import { Outlet } from 'react-router'
import useStore from '@/store/store'
import { Sidebar } from '@/components/layout/Sidebar'
import Profile from '../modal/Profile'
import MobileNabvar from '@/components/layout/MobileNabvar'

export default function Dashboard() {
  const isOpenProfile = useStore(state => state.isOpenProfile)
  const [showNabvar, setShowNavbar] = useState(false)

  return (
    <main className="h-screen relative flex flex-col lg:flex-row">
      {isOpenProfile && (
        <Profile />
      )}

      <MobileNabvar
        showNavbar={showNabvar}
        setShowNavbar={setShowNavbar}
      />
      <Sidebar
        showNavbar={showNabvar}
      />
      <div className="grow bg-white border-1 shadow-xl rounded-md border-gray-200 my-10 mx-6 font-montserrat-regular">
        <Outlet />
      </div>
    </main>
  )
}
