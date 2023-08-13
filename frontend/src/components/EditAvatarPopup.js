import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
   const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({});

   React.useEffect(() => {
      resetForm();
   }, [resetForm, isOpen]);

   function handleSubmit(e) {
      e.preventDefault();

      onUpdateAvatar({
         avatar: values.avatar,
      });
   }

   return (
      <PopupWithForm name="avatar" title="Обновить аватар" buttonText='Сохранить'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input type="url" name="avatar" id="avatar-input" placeholder="Ссылка на картинку"
            className="popup__input" minLength="2" maxLength="200" required onChange={handleChange} value={values.avatar || ""} />
         {!isValid && (<span id="avatar-error" className="popup__input-error avatar-input-error">{errors.avatar}</span>)}
      </PopupWithForm>
   )
}

export default EditAvatarPopup;