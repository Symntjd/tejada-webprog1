import Button from '../components/Button'
import ArticleList from '../components/ArticleList'
import articles from '../assets/article-content.js'

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-black sm:text-4xl">
          Explore featured reading topics in a cleaner layout
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
          This page presents a list of articles using reusable cards and props.
          Each entry gives a short preview before leading the reader to a full
          article page with more detailed content.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-black">
            Article card grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  )
}

export default ArticleListPage