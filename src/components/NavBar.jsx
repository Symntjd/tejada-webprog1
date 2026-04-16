import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/st-logo.png'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
]

const navLinkClasses = ({ isActive }) =>
  `rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all ${
    isActive
      ? 'bg-blue-900 text-white'
      : 'border border-gray-300 bg-white text-black hover:bg-gray-100'
  }`

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ST Logo"
            className="h-10 w-auto object-contain drop-shadow-sm"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-black">
              ST Studio
            </p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-gray-600">
              ARF ARF
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default NavBar