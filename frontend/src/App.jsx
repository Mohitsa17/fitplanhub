import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import TrainerDashboard from './pages/TrainerDashboard';
import PlanDetails from './pages/PlanDetails';
import TrainerProfile from './pages/TrainerProfile';
import Explore from './pages/Explore';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route
          path="/explore"
          element={
            <RoleRoute allowedRole="user">
              <Explore />
            </RoleRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <RoleRoute allowedRole="user">
              <Feed />
            </RoleRoute>
          }
        />

        {/* Trainer Routes */}
        <Route
          path="/trainer/dashboard"
          element={
            <RoleRoute allowedRole="trainer">
              <TrainerDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/profile/setup"
          element={
            <RoleRoute allowedRole="trainer">
              <TrainerProfile />
            </RoleRoute>
          }
        />

        {/* Shared Routes (Internal logic handles role diffs) */}
        <Route
          path="/plans/:id"
          element={
            <ProtectedRoute>
              <PlanDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/:id"
          element={
            <ProtectedRoute>
              <TrainerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
