const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
            ST Studio
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
            A simple React article project focused on Dog Breeds.
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p>Web Systems</p>
          <p className="mt-1">Lab Activity Project</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer