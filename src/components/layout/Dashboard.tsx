import { Sidebar } from '@/components/layout/Sidebar';
import { Outlet } from 'react-router';

export default function Dashboard() {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="grow bg-white border-1 shadow-xl rounded-md border-gray-200 my-10 mx-6 font-montserrat-regular">
        <Outlet />
      </div>
    </main>
  )
}
