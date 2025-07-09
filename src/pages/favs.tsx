import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Card, { CardProps } from "../components/card";
import "../styles/cardstyles.css";

const FAVORITES_KEY = "favorites";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<CardProps[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      setFavorites(JSON.parse(raw));
    }
  }, []);

  const handleRemove = (id: number | string) => {
    const updated = favorites.filter((c) => c.id !== id);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  return (
    <>
      <Header />
      <div className="card-list">
        {favorites.length > 0 ? (
          favorites.map((c) => (
            <div key={c.id} className="card-wrapper">
              <Card {...c} />
              <button
                className="remove-btn"
                onClick={() => handleRemove(c.id)}
              >
                Delete card
              </button>
            </div>
          ))
        ) : (
          <p>Nothing to show :</p>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
