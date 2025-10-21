import { useAuthUser } from '../features/auth/authApi.js';
import { useAuthStore } from '../features/auth/authStore.js';

const DashboardPage = () => {
  const { data: user, isLoading, isError } = useAuthUser();
  const logout = useAuthStore((state) => state.logout);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error loading user data.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to ProjectHub, {user.data.user.name}!</h1>
      <p className="mt-2 text-gray-600">Your email is {user.data.user.email}</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;