import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticleListPage from './pages/ArticleListPage'
import ArticlePage from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'

import SignInPage from './pages/AuthPages/SignInPage'
import SignUpPage from './pages/AuthPages/SignUpPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App