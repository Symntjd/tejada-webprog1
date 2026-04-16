import Button from '../components/Button'

function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
          Home
        </p>

        <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-black sm:text-4xl">
          Explore Popular Dog Breeds and Their Unique Traits
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          This project presents a collection of dog breed articles designed to
          showcase their characteristics, personality, and care needs. Each
          article provides a simple and structured overview to help readers
          understand what makes each breed unique.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          From loyal companions to energetic working dogs, this collection
          highlights different types of breeds including the Shiba Inu, Golden
          Retriever, German Shepherd, and French Bulldog.
        </p>

        <div className="mt-6">
          <Button to="/articles" variant="primary">
            View Dog Articles
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage