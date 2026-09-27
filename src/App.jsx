import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {PublicRoute} from '@/components/auth/PublicRoute';
import {LoginPage} from '@/pages/auth/LoginPage';
import {SignupPage} from '@/pages/auth/SignupPage';
import { VerifyCodePage } from '@/pages/auth/VerifyCodePage';
import {ForgotPasswordPage} from '@/pages/auth/ForgotPasswordPage';
import {ResetPasswordPage} from '@/pages/auth/ResetPasswordPage';
import {DoctorOnboardingPage} from '@/pages/onboarding/DoctorOnboardingPage';
import {Dashboard} from '@/components/dashboard/placeholder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public (Auth) Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/authentication/login" element={<LoginPage />} />
          <Route path="/authentication/signup" element={<SignupPage />} />
          <Route path="/authentication/verify-code" element={<VerifyCodePage />} />
          <Route path="/authentication/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/authentication/reset-password" element={<ResetPasswordPage />} />
          <Route path="/test-path" element = {<DoctorOnboardingPage/>}/>
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
