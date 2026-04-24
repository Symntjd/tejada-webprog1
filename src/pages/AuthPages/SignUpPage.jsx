import { Link } from 'react-router-dom'
import Button from '../../components/Button'

function SignUpPage() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
        Sign Up
      </p>

      <h1 className="mt-3 text-3xl font-bold text-black">
        Create your account
      </h1>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        Join the dog breed guide and start browsing helpful breed articles in a
        clean and organized layout.
      </p>

      <form className="mt-8 flex flex-col gap-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-black">
            Favorite Dog Breed
          </label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100">
            <option>Shiba Inu</option>
            <option>Golden Retriever</option>
            <option>German Shepherd</option>
            <option>French Bulldog</option>
          </select>
        </div>

        <label className="flex items-start gap-2 text-sm leading-6 text-gray-600">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-blue-900" />
          I agree to receive simple updates about dog breed articles.
        </label>

        <Button to="/" variant="primary" className="w-full py-3">
            Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-blue-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignUpPage