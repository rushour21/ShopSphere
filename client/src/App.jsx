import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProtectedRoute from './protectedRoute';
import Dashboard from './pages/dashboard';
import Overview from './component/overview';
import Stores from './component/stores';
import Users from './component/users';
import Home from './pages/home';
import UserDashboard from './pages/userDashboard';
import StoreDashboard from './pages/storeDashboard';
import CreateStore from './component/createStore';

function App() {
  const user = useSelector((state) => state.loggedUser);

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/* Admin Routes */}
      <Route path='/dashboard' element={
        <ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]}>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Overview />} />
        <Route path='overview' element={<Overview />} />
        <Route path='stores' element={<Stores />} />
        <Route path='users' element={<Users />} />
        <Route path='createstore' element={<CreateStore />} />
      </Route>

      {/* User Dashboard */}
      <Route path='/userdashboard' element={
          <UserDashboard />
      } />

      {/* Store Owner Dashboard */}
      <Route path='/stores' element={
        <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
          <StoreDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;
