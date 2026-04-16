import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout