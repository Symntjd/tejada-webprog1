import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";

import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import AuthLayout from "./layouts/AuthLayout";

import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";

function AdminOnlyRoute({ children }) {
  const userType = localStorage.getItem("userType");

  if (userType === "editor") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Website Pages */}
<Route path="/" element={<Layout />}>
  <Route index element={<Navigate to="/signin" replace />} />
  <Route path="articles" element={<ArticleListPage />} />
  <Route path="articles/:id" element={<ArticlePage />} />
  <Route path="about" element={<AboutPage />} />
</Route>
      {/* Auth Pages */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      {/* Dashboard Pages */}
<Route path="/dashboard" element={<DashLayout />}>
  <Route index element={<DashboardPage />} />
  <Route path="reports" element={<ReportsPage />} />

  <Route
    path="users"
    element={
      <AdminOnlyRoute>
        <UsersPage />
      </AdminOnlyRoute>
    }
  />

  <Route
    path="dashboard-articles"
    element={<DashArticleListPage />}
  />
</Route>

      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;