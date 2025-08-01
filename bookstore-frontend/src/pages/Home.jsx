import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-900">
      {/* Background layer */}
      <div
        className="fixed inset-0 bg-no-repeat bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* Foreground content */}
      <div className="w-full max-w-4xl mx-auto p-8 bg-white/80 shadow-xl rounded-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-4 text-center text-amber-800">
          Welcome to the Lantern Library 📚
        </h1>

        {user ? (
          <p className="text-xl text-center text-gray-700">
            Welcome back, <span className="font-semibold">{user.username}</span>
            !
          </p>
        ) : (
          <p className="text-center text-gray-700">
            Please{' '}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{' '}
            or{' '}
            <a href="/register" className="text-blue-600 underline">
              create an account
            </a>{' '}
            to start saving your favorites.
          </p>
        )}
      </div>
    </div>
  );
}
