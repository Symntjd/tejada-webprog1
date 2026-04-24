import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/st-logo.png'

const NavBar = () => {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
              ST Studio
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-gray-500">
              ARF ARF
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">

          {/* Main links */}
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Auth buttons */}
          <NavLink
            to="/signin"
            className="rounded-full px-4 py-1 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/signup"
            className="rounded-full px-4 py-1 text-sm font-medium bg-blue-900 text-white hover:bg-blue-800"
          >
            Sign Up
          </NavLink>

        </nav>
      </div>
    </header>
  )
}

export default NavBar