import React, { useState, useEffect } from 'react';
import { images } from '../components/images-array';
import '../styles/newcardstyles.css';
import Header from '../components/header';

const USER_CARDS_KEY = 'userCards';

// Интерфейс для ошибки формы
interface FormErrors {
  title?: string;
  description?: string;
  imageId?: string;
  date?: string;
}

// Интерфейс для карточки
interface Card {
  id: number;
  title: string;
  description: string;
  image: string; // Используем строку, так как это URL изображения
  date: string;
}

const CreateCard: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageId, setImageId] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [cardList, setCardList] = useState<Card[]>([]); // Используем тип для списка карточек
  const [errors, setErrors] = useState<FormErrors>({}); // Используем тип для ошибок

  useEffect(() => {
    const savedCards = localStorage.getItem(USER_CARDS_KEY);
    if (savedCards) {
      setCardList(JSON.parse(savedCards));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required'; // Используем двойные кавычки
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Publication date is required';
    if (!imageId) newErrors.imageId = 'Please select an image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newCard: Card = {
      id: cardList.length + 1,
      title,
      description,
      image: images.find((img) => img.id === imageId)?.src || '',
      date,
    };

    const updatedCards = [...cardList, newCard];
    setCardList(updatedCards);

    localStorage.setItem(USER_CARDS_KEY, JSON.stringify(updatedCards));

    setTitle('');
    setDescription('');
    setImageId(1);
    setDate('');
  };

  const handleDelete = (id: number) => {
    const updatedCards = cardList.filter((card) => card.id !== id);
    setCardList(updatedCards);

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
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              maxLength={200}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
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
                    className={`image-thumbnail ${image.id === imageId ? 'selected' : ''}`}
                  />
                </label>
              ))}
            </div>
            {errors.imageId && <span className="error">{errors.imageId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Publication Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <button type="submit">Create Card</button>
        </form>

        <div className="card2-list">
          {cardList.map((card) => (
            <div key={card.id} className="card2">
              <img src={card.image} alt={card.title} className="card2-image" />
              <div className="card2-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <p>
                  <strong>Published on:</strong> {card.date}
                </p>
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
