import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardProps } from '../components/card';
import '../styles/detailed.css';
import Header from '../components/header';

const CardDetail: React.FC = () => {
  /* Hook to give us dynamic ID + cards array from storage*/
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardProps | null>(null);

  /* Hook to fetch data right after the page loading */
  useEffect(() => {
    const fetchCard = async () => {
      const savedCards = localStorage.getItem('dummyCards');
      if (savedCards) {
        const cards: CardProps[] = JSON.parse(savedCards);
        const selectedCard = cards.find((card) => card.id.toString() === id);
        setCard(selectedCard || null);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) {
    return <div>Card not found!</div>;
  }

  return (
    <>
      <Header />
      <div className="card-detail">
        <h2>{card.title}</h2>
        <img src={card.images[0]} alt={card.title} className="card-image" />
        <p>{card.description}</p>

        <Link to="/">
          <button className="back-btn">Go back</button>
        </Link>
      </div>
    </>
  );
};

export default CardDetail;
