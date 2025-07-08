import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Для извлечения параметра id из URL
import { CardProps } from "../components/card"; // Тип для карточки
import "../styles/detailed.css"; // Подключаем стили
import Header from "../components/header";

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Извлекаем параметр id из URL
  const [card, setCard] = useState<CardProps | null>(null);

  useEffect(() => {
    // Загружаем данные карточки с указанным id
    const fetchCard = async () => {
      const savedCards = localStorage.getItem("dummyCards"); // Используем правильный ключ для данных dummyCards
      if (savedCards) {
        const cards: CardProps[] = JSON.parse(savedCards);
        const selectedCard = cards.find((card) => card.id.toString() === id);
        setCard(selectedCard || null); // Устанавливаем карточку в состояние
      }
    };

    fetchCard();
  }, [id]); // Перезапускать при изменении id

  if (!card) {
    return <div>Card not found!</div>; // Если карточка не найдена
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
