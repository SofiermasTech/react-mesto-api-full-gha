import React from "react";

const ImagePopup = ({ card, onClose }) => {
   return (
      <section className={`popup popup-view ${card.link ? "popup_opened" : ""}`}>
         <div className="popup-view__image-container">
            <img src={card.link} alt={card.name} className="popup-view__image" />
            <p className="popup-view__caption">{card.name}</p>
            <button type="button" className="popup__close popup-view__btn-close" onClick={onClose}></button>
         </div>
      </section>
   )
}

export default ImagePopup;