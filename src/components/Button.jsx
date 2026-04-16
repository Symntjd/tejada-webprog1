import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'bg-blue-900 text-white hover:bg-blue-800',
  secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-100',
}

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = `inline-flex justify-center rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${variantClasses[variant] ?? variantClasses.secondary} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button