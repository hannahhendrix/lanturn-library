import { useEffect, useState, useRef } from "react";
import BookModal from "../components/BookModal";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [turning, setTurning] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const limit = 4;
  const audioRef = useRef(null);

  useEffect(() => {
    // Play sound and trigger visual
    setTurning(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Lower volume
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.warn("Page turn sound error:", err));
    }

    // Hide visual after animation
    setTimeout(() => setTurning(false), 800); // match GIF duration

    // Fetch books
    fetch(`http://localhost:4000/api/books?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.books || []))
      .catch((err) => {
        console.error("Error fetching books:", err);
        setBooks([]);
      });
  }, [page]);

  return (
    <div className="relative min-h-screen text-gray-900">
      {/* Page-turn sound */}
      <audio ref={audioRef} src="/page-turn.wav" preload="auto" />

      {/* Book background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 w-full h-full"
        style={{ backgroundImage: "url('/book-bg.jpg')" }}
      />

      {/* Page-turn GIF overlay */}
      {turning && (
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#fdf6e3]/20">
          <img
            src="/page-turning.gif"
            alt="Page turning"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 📘 Catalog Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-12 tracking-wide drop-shadow-lg">
          📖 The Lantern Library Catalog
        </h1>

        {/* Book Grid */}
        <div className="flex flex-wrap justify-center gap-8 bg-[#fdf6e3]/10 p-8 rounded-3xl shadow-xl backdrop-blur-sm border border-amber-200">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => setSelectedBook(book)}
              className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer w-full sm:w-[45%] lg:w-[30%] xl:w-[22%]"
            >
              <img
                src={`http://localhost:4000${book.coverImage}`}
                alt={book.title}
                className="h-64 w-full object-cover rounded mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-cover.jpg";
                }}
              />
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-700">{book.author}</p>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-10 max-w-xl mx-auto">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full shadow"
          >
            ⬅️ Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full shadow"
          >
            Next ➡️
          </button>
        </div>

        {/* ➕ Add Book */}
        <div className="mt-8 text-center">
          <a
            href="/add"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            ➕ Add Book
          </a>
        </div>
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      </div>
    </div>
  );
}
