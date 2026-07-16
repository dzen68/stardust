import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" replace /> : <AuthView initialMode="login" />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/" replace /> : <AuthView initialMode="register" />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
