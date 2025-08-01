import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';

export default function App() {
  const { user, logout } = useContext(AuthContext);

  //test
  console.log('App sees user:', user);

  return (
    <Router>
      <div className="min-h-screen bg-amber/30 text-gray-900 backdrop-blur-[2px]">
        <nav className="bg-white/80 backdrop-blur-md shadow p-4 flex gap-4 items-center justify-between px-6">
          <Link
            to="/"
            className="font-bold text-amber-700 text-xl tracking-wider"
          >
            📚 The Lantern Library
          </Link>
          <div className="flex gap-4 items-center">
            {!user ? (
              <>
                <Link to="/login" className="hover:text-amber-700">
                  Login
                </Link>
                <Link to="/register" className="hover:text-amber-700">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/catalog" className="hover:text-amber-700">
                  Catalog
                </Link>
                <Link to="/favorites" className="hover:text-amber-700">
                  Favorites
                </Link>
                <Link to="/search" className="hover:text-amber-700">
                  Search
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <main className="p-6 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
