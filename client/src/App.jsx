import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
// Layout
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';

// public
import Home from './pages/public/Home';
import PostDetail from './pages/public/Post';
import ListArticles from './pages/public/ListArticles';

// admin
import Dashboard from './pages/admin/Dashboard';
// AdminPost
import PostsList from './pages/admin/PostsList';
import PostForm from './pages/admin/PostForm';
import BlogSetting from './pages/admin/BlogSetting';

// AdminUser

import EditUser from './pages/admin/EditUser';
import ShowUser from './pages/admin/ShowUser';

// auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

//
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />

            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="writing" element={<ListArticles />} />
              <Route path="posts/:slug" element={<PostDetail />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="posts" element={<PostsList />} />
              <Route path="post/create" element={<PostForm />} />
              <Route path="post/edit/:id" element={<PostForm />} />
              <Route path="setting" element={<BlogSetting />} />
              {/* TODO */}
              <Route path="user/:id" element={<ShowUser />} />
              <Route path="user/edit/:id" element={<EditUser />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
