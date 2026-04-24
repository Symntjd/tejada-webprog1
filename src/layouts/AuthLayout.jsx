import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 text-black">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-lg lg:grid-cols-[1fr_1.1fr]">
        <section className="hidden bg-blue-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-100">
              Welcome
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Discover dog breeds with a clean and simple guide.
            </h1>
            <p className="mt-4 text-sm leading-7 text-blue-100">
              Sign in or create an account to explore breed articles, learn
              about traits, and browse dog information in one organized place.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-5">
            <p className="text-sm leading-6 text-blue-50">
              Featured breeds include Shiba Inu, Golden Retriever, German
              Shepherd, and French Bulldog.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-8 lg:p-10">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default AuthLayout