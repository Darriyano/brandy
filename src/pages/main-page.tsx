import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Card, { CardProps } from '../components/card';
import '../styles/cardstyles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Constannt keys to store data in localstorage */
const FAVORITES_KEY = 'favorites';
const DUMMY_CARDS_KEY = 'dummyCards';

const MainPage: React.FC = () => {
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* Function to upload data from the dummyjson into localstorage and save them in a hook for a while*/
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

        localStorage.setItem(DUMMY_CARDS_KEY, JSON.stringify(products));

        /* Using hook useState to save fetched items */
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

  /* Function to add one card into favourites */
  const handleAdd = (card: CardProps) => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const existing: CardProps[] = raw ? JSON.parse(raw) : [];
    if (!existing.find((c) => c.id === card.id)) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...existing, card]));
      toast.success(`«${card.title}» добавлен в избранное!`);
    } else {
      toast.info(`«${card.title}» уже в избранном!`);
    }
  };

  /* If loading is active - waiting fo data from dummyjson to fetch */
  if (loading) {
    return (
      <>
        <Header />
        <div className="card-list">Wait...We are looking for our goods</div>
      </>
    );
  }

  /* If error was thrown */
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

  /* If eveerything is okay and we can show all fetched data */
  return (
    <>
      <Header />
      <div className="card-list">
        {items.map((c) => (
          <div key={c.id} className="card-wrapper">
            {/* Unique dynamic URL for each card - aafter click redirecting to details */}
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

      <ToastContainer />
    </>
  );
};

export default MainPage;
