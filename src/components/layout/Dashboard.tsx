import { Sidebar } from '@/components/layout/Sidebar';
import { Outlet } from 'react-router';

export default function Dashboard() {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="grow">
        <Outlet />
      </div>
    </main>
  )
}
