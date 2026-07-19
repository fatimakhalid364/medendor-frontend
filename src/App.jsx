import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {PublicRoute} from '@/components/auth/PublicRoute';
import {LoginPage} from '@/pages/auth/LoginPage';
import {Signup} from '@/components/auth/Signup';
import { VerifyCode } from '@/components/auth/VerifyCode';
import {Dashboard} from '@/components/dashboard/placeholder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public (Auth) Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/authentication/login" element={<LoginPage />} />
          <Route path="/authentication/signup" element={<Signup />} />
          <Route path="/authentication/verify-code" element={<VerifyCode />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/:role/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
