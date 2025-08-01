import { useEffect, useState } from "react";

export default function BookModal({ book, onClose }) {
  if (!book) return null; // Prevent rendering if no book

  const [isFavorited, setIsFavorited] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:4000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((favorites) => {
        setIsFavorited(favorites.some((fav) => fav._id === book._id));
      })
      .catch((err) => console.error("Error fetching favorites:", err));
  }, [book, token]);

  const handleAddToFavorites = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/favorites/${book._id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add");
      setIsFavorited(true);
    } catch (err) {
      console.error("Error adding to favorites:", err.message);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/favorites/${book._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove");
      setIsFavorited(false);
    } catch (err) {
      console.error("Error removing from favorites:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>
        <img
          src={`http://localhost:4000${book.coverImage}`}
          alt={book.title}
          className="w-full h-72 object-contain rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
        <p className="text-sm text-gray-600 italic mb-1">{book.genre}</p>
        <p className="text-sm text-gray-600 mb-1">
          Published: {book.publishedYear}
        </p>
        <p className="text-sm text-gray-600 mb-1">Price: ${book.price}</p>
        <p className="text-sm text-gray-600 mb-1">
          {book.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <p className="mt-4 text-gray-800">{book.description}</p>

        {isFavorited ? (
          <button
            onClick={handleRemoveFromFavorites}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            ❤️ Remove from Favorites
          </button>
        ) : (
          <button
            onClick={handleAddToFavorites}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
}
