import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <AuthProvider>
      <div>
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
