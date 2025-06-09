import { Outlet } from 'react-router'
import { Sidebar } from '@/components/layout/Sidebar'
import MobileNabvar from '@/components/layout/MobileNabvar'
import { useState } from 'react'

export default function Dashboard() {
  const [showNabvar, setShowNavbar] = useState(false)
  return (
    <main className="h-screen relative flex flex-col lg:flex-row">
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
