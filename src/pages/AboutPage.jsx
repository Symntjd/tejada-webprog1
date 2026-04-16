function AboutPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
          About
        </p>

        <h1 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
          About This Dog Breed Collection
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          This project was created to present a simple and organized collection
          of dog breed information using a clean and structured layout. Each
          article focuses on introducing a specific breed, including its
          personality, behavior, and general characteristics.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          The goal of this project is to demonstrate how content can be organized
          using reusable components and structured pages while also providing
          useful and easy-to-read information for dog enthusiasts.
        </p>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          The featured breeds include the Shiba Inu, Golden Retriever, German
          Shepherd, and French Bulldog.each selected for their popularity and
          distinct traits.
        </p>
      </section>
    </div>
  )
}

export default AboutPage