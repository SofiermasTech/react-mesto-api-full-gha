import React from "react";

const PopupWithForm = (props) => {
   return (
      <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
         <div className="popup__container popup-avatar__container">
            <button type="button" className="popup__close" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form popup-avatar__form" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>
               {props.children}
               <button type="submit" className="popup__submit ">{props.buttonText || 'Сохранить'}</button>
            </form>
         </div>
      </section>
   )
}

export default PopupWithForm;