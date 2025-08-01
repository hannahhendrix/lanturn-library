import { useEffect, useState } from 'react';
import BookModal from '../components/BookModal';

export default function Search() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);

    fetch(
      `http://localhost:4000/api/books?search=${encodeURIComponent(search)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setBooks([]);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900 relative">
      <h1 className="text-3xl font-bold text-center mb-6 text-amber-800">
        🔍 Search the Library
      </h1>

      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto flex gap-4 mb-10"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="flex-1 px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          type="submit"
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-md shadow"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Searching...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => setSelectedBook(book)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={`http://localhost:4000${book.coverImage}`}
                alt={book.title}
                className="h-64 w-full object-cover rounded mb-2"
                onError={(e) => (e.target.src = '/default-cover.jpg')}
              />
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-700">{book.author}</p>
            </div>
          ))}
        </div>
      )}

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
