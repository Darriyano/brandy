import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // импортируем Link для маршрутизации
import Header from "../components/header";
import Card, { CardProps } from "../components/card";
import "../styles/cardstyles.css";

const FAVORITES_KEY = "favorites";

const MainPage: React.FC = () => {
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // загружаем данные из dummyjson
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { products } = (await res.json()) as {
          products: Array<{
            id: number;
            title: string;
            description: string;
            images: string[];
          }>;
        };
        setItems(
          products.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            images: p.images,
          }))
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = (card: CardProps) => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const existing: CardProps[] = raw ? JSON.parse(raw) : [];
    if (!existing.find((c) => c.id === card.id)) {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify([...existing, card])
      );
      alert(`«${card.title}» добавлен в избранное`);
    } else {
      alert(`«${card.title}» уже в избранном`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="card-list">Wait...We're looking for our goods</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Header />
        <div className="card-list">Oops, we're came across the error: {error}</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="card-list">
        {items.map((c) => (
          <div key={c.id} className="card-wrapper">
            <Link to={`/link/${c.id}`}>
              <Card {...c} />
            </Link>
            <button
              className="add-btn"
              onClick={() => handleAdd(c)}
              style={{ marginTop: "8px" }}
            >
              Добавить в избранное
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
