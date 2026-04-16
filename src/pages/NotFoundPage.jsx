import Button from '../components/Button'
import snoopy from '../assets/snoopy.jpg'

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-8 text-center shadow-lg">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
          Error Paw 0 Paw
        </p>

        <div className="mt-6 flex justify-center">
  <img
    src={snoopy}
    alt="Confused Snoopy"
    className="h-40 w-auto rounded-xl object-contain"
  />
</div>

        <h1 className="mt-6 text-3xl font-bold text-black sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
          Looks like Snoopy is just as confused as you. 
          This page does not exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button to="/" variant="primary">
            Go Home
          </Button>
          <Button to="/articles">View Articles</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage