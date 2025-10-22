import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { useAuthStore } from './features/auth/authStore.js';
import { Layout } from './components/layout/Layout.jsx'; // <-- Import Layout

const queryClient = new QueryClient();

function AppRoutes() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route 
        path="/dashboard" 
        element={
          token ? (
            <Layout> {/* <-- Wrap with Layout */}
              <DashboardPage />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider > );
}

export default App;