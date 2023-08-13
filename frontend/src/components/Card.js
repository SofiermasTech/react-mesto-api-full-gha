import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
   const currentUser = useContext(CurrentUserContext);

   const isOwn = card.owner._id === currentUser._id;
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = (
      `card__button-like ${isLiked ? 'card__button-like_active' : ''}`
   );

   const handleLikeClick = () => {
      onCardLike(card);
   };

   const handleClick = () => {
      onCardClick(card);
   };

   const handleDeleteClick = () => {
      onCardDelete(card._id);
   };

   return (
      <li className="card" key={card._id}>
         <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
         {isOwn && <button type="button" className="card__button-deleted" onClick={handleDeleteClick} />}
         <div className="card__container">
            <h2 className="card__description">{card.name}</h2>
            <div className="card__like-area">
               <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Like"></button>
               <p className="card__like-counter">{card.likes.length}</p>
            </div>
         </div>
      </li>
   );
}

export default Card;