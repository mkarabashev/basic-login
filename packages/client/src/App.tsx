import LoginPage from './components/LoginPage/LoginPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './components/RegisterPage/RegisterPage'
import UserPage from './components/UserPage/UserPage'
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<PrivateRoute component={UserPage} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App
