import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
   const currentUser = useContext(CurrentUserContext);
   const { values, errors, isValid, handleChange, resetForm, setValues } = useFormAndValidation();

   const handleSubmit = (evt) => {
      evt.preventDefault();

      onUpdateUser({
         name: values.name,
         about: values.about,
      });
   };

   useEffect(() => {
      resetForm();
      setValues(currentUser);
   }, [currentUser, resetForm, isOpen, setValues])

   return (
      <PopupWithForm name="edit" title="Редактировать профиль" buttonText='Сохранить'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input type="text" name="name" id="author-input" placeholder="Имя" minLength="2" maxLength="40"
            className="popup__input  popup__input_type_name" required value={values.name || ""}
            onChange={handleChange} />
         {!isValid && (<span id="name-error" className="popup__input-error author-input-error">{errors.name}</span>)}
         <input type="text" name="about" id="job-input" placeholder="Вид деятельности" minLength="2" maxLength="200"
            className="popup__input popup__input_type_job" required value={values.about || ""}
            onChange={handleChange} />
         {!isValid && (<span id="job-error" className="popup__input-error job-input-error">{errors.about}</span>)}
      </PopupWithForm>

   )
}

export default EditProfilePopup;