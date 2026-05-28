import Button from './Button'
import { Link } from 'react-router-dom'

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-48 w-full object-cover"
          />

          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-900">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-black">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {article.content[0].substring(0, 100)}...
            </p>

            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4" variant="primary">
                Read More
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ArticleList