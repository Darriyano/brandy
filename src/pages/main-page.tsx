import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Card, { CardProps } from '../components/card';
import '../styles/cardstyles.css';

// Импортируем компонент и стили для уведомлений
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FAVORITES_KEY = 'favorites';
const DUMMY_CARDS_KEY = 'dummyCards';

const MainPage: React.FC = () => {
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { products } = (await res.json()) as {
          products: Array<{
            id: number;
            title: string;
            description: string;
            images: string[];
          }>;
        };

        // Сохраняем данные в localStorage
        localStorage.setItem(DUMMY_CARDS_KEY, JSON.stringify(products));

        setItems(
          products.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            images: p.images,
          })),
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
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...existing, card]));
      // Показываем уведомление о добавлении в избранное
      toast.success(`«${card.title}» добавлен в избранное!`);
    } else {
      // Показываем уведомление, что карточка уже в избранном
      toast.info(`«${card.title}» уже в избранном!`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="card-list">Wait...We are looking for our goods</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Header />
        <div className="card-list">
          Oops, we are came across the error: {error}
        </div>
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
              style={{ marginTop: '8px' }}
            >
              Добавить в избранное
            </button>
          </div>
        ))}
      </div>

      {/* Добавляем контейнер для уведомлений */}
      <ToastContainer />
    </>
  );
};

export default MainPage;
