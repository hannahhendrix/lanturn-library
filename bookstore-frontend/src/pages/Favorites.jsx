import { useEffect, useState } from "react";
import BookModal from "../components/BookModal";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:4000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Error fetching favorites:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-12 tracking-wide drop-shadow-lg">
        ❤️ Your Favorite Books
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {favorites.map((book) => (
          <div
            key={book._id}
            onClick={() => setSelectedBook(book)}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer w-full sm:w-[45%] lg:w-[30%] xl:w-[22%]"
          >
            <img
              src={`http://localhost:4000${book.coverImage}`}
              alt={book.title}
              className="h-64 w-full object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-sm text-gray-700">{book.author}</p>
          </div>
        ))}
      </div>

      {/*Show modal OUTSIDE the map, conditionally */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
