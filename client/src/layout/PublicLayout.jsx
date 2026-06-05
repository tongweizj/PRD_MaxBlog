import { Link, Outlet } from 'react-router-dom';
// 如果你暂时没用到这些 React-Bootstrap 组件，可以先保留引用或删除
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './public.css';
const PublicLayout = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: '700px' }}>
        <nav className="mb-5">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link ps-0" to="/">
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/writing">
                writing
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
        <footer className="mt-3 pt-3 pb-5 text-secondary">
          <p>© 2026 Wei(Max) Tong</p>
        </footer>
      </div>
    </>
  );
};

export default PublicLayout;
