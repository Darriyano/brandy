import React, { useState, useEffect } from "react";
import { images } from "../components/images-array"; // импортируем фото
import "../styles/newcardstyles.css";
import Header from "../components/header";

const USER_CARDS_KEY = "userCards"; // Новый ключ для хранения карточек

const CreateCard: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageId, setImageId] = useState<number>(1); // по умолчанию выбрана первая картинка
  const [date, setDate] = useState<string>("");
  const [cardList, setCardList] = useState<any[]>([]); // для хранения созданных карточек

  // Загружаем карточки из localStorage при монтировании компонента
  useEffect(() => {
    const savedCards = localStorage.getItem(USER_CARDS_KEY);
    if (savedCards) {
      setCardList(JSON.parse(savedCards));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Создаем новую карточку
    const newCard = {
      id: cardList.length + 1, // уникальный id для карточки
      title,
      description,
      image: images.find((img) => img.id === imageId)?.src,
      date,
    };

    // Обновляем список карточек
    const updatedCards = [...cardList, newCard];
    setCardList(updatedCards);

    // Сохраняем карточки в localStorage с новым ключом
    localStorage.setItem(USER_CARDS_KEY, JSON.stringify(updatedCards));

    // Очищаем поля формы
    setTitle("");
    setDescription("");
    setImageId(1);
    setDate("");
  };

  // Удаление карточки из списка и из localStorage
  const handleDelete = (id: number) => {
    const updatedCards = cardList.filter((card) => card.id !== id);
    setCardList(updatedCards);

    // Сохраняем обновлённый список карточек в localStorage
    localStorage.setItem(USER_CARDS_KEY, JSON.stringify(updatedCards));
  };

  return (
    <>
      <Header />
      <div className="create-card2">
        <h2>Create a New Card</h2>
        <form onSubmit={handleSubmit} className="create-card2-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              maxLength={200}
              required
            />
          </div>

          <div className="form-group">
            <label>Choose an image</label>
            <div className="image-radio-buttons">
              {images.map((image) => (
                <label key={image.id} className="image-option">
                  <input
                    type="radio"
                    name="image"
                    value={image.id}
                    checked={image.id === imageId}
                    onChange={() => setImageId(image.id)}
                  />
                  <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className={`image-thumbnail ${image.id === imageId ? "selected" : ""}`}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Publication Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit">Create Card</button>
        </form>

        <div className="card2-list">
          {cardList.map((card) => (
            <div key={card.id} className="card2">
              <img
                src={card.image}
                alt={card.title}
                className="card2-image"
              />
              <div className="card2-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <p><strong>Published on:</strong> {card.date}</p>
                <button 
                  className="remove-btn2"
                  onClick={() => handleDelete(card.id)}
                >
                  Delete card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateCard;
