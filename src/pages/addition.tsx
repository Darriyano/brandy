import React, { useState, useEffect } from 'react';
import { images } from '../components/images-array';
import '../styles/newcardstyles.css';
import Header from '../components/header';

const USER_CARDS_KEY = 'userCards';

/* Data structures to store information */
interface FormErrors {
  title?: string;
  description?: string;
  imageId?: string;
  date?: string;
}

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const CreateCard: React.FC = () => {
  /* Hook UseState to save entered information before pushing it into the storage */
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageId, setImageId] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [cardList, setCardList] = useState<Card[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  /* After loading the page placing user cards from storage if have any */
  useEffect(() => {
    const savedCards = localStorage.getItem(USER_CARDS_KEY);
    if (savedCards) {
      setCardList(JSON.parse(savedCards));
    }
  }, []);

  /* Validation for the form: user cannot save empty fields, some info must be entered not to cause problems */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 3) {
      newErrors.description = 'Description must be at least 3 characters long';
    }

    if (!date) {
      newErrors.date = 'Publication date is required';
    } else {
      const year = new Date(date).getFullYear();
      if (year < 1900 || year > 2050) {
        newErrors.date = 'Publication date must be between 1900 and 2050';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* If data is correct, forming new user card and saving it into the localstorage*/
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

    /* After saving, reset the states */
    setTitle('');
    setDescription('');
    setImageId(1);
    setDate('');
  };

  /* Choosing all cards (excluding chosen one) and updating the card list in storage */
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
        {/* Form with input, textarea, radio buttons and date input */}
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
            {/* If validation error, show the message */}
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
            {/* If validation error, show the message */}
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
            {/* If validation error, show the message */}
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
            {/* If validation error, show the message */}
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <button type="submit">Create Card</button>
        </form>

        <div className="card2-list">
          {/* Going through the array element by element and showing them in the screen */}
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
