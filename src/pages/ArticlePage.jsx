import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import articles from '../assets/article-content.js'

function ArticlePage() {
  const { name } = useParams()
  const article = articles.find((article) => article.name === name)

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-black">Article not found</h1>
            <div className="mt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
            Article
          </p>

          <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {article.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img
            src={article.image}
            alt={article.title}
            className="h-72 w-full rounded-2xl object-cover"
          />

          <div className="mt-8 space-y-4 text-gray-700">
            {article.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap text-base leading-7">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <Button to="/articles" variant="primary">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticlePage