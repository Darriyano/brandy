// src/components/card.tsx
import React from 'react';
import '../styles/cardstyles.css';
import defaultImg from '../images/img.jpg';

export interface CardProps {
  id: number | string;
  title: string;
  description: string;
  images: string[];
}

interface CardWithAddProps extends CardProps {
  onAdd?: (card: CardProps) => void;
}

const Card: React.FC<CardWithAddProps> = ({
  id,
  title,
  description,
  images,
  onAdd,
}) => {
  const imgSrc = images.length > 0 ? images[0] : defaultImg;

  return (
    <div className="card" id={id.toString()}>
      <img
        className="card-image"
        src={imgSrc}
        alt={title}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = defaultImg;
        }}
      />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        {onAdd && (
          <button
            className="card-add-btn"
            onClick={() => onAdd({ id, title, description, images })}
          >
            Добавить в избранное
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
