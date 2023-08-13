import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
//import useForm from "../hooks/useForm.js";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
   const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

   useEffect(() => {
      resetForm();
   }, [resetForm, isOpen])

   const handleSubmit = (evt) => {
      evt.preventDefault();

      onAddPlace({
         name: values.name,
         link: values.link
      });
   };

   return (
      <PopupWithForm name="new-card" title="Новое место" buttonText='Создать'
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input type="text" name="name" id="place-input" placeholder="Название" minLength="2" maxLength="30"
            className="popup__input popup__input_type_place" required onChange={handleChange}
            value={values.name || ''} />
         {!isValid && (<span id="title-error" className="popup__input-error place-input-error">{errors.name}</span>)}
         <input type="url" name="link" id="link-input" placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link" required onChange={handleChange}
            value={values.link || ''} />
         {!isValid && (<span id="link-error" className="popup__input-error link-input-error">{errors.link}</span>)}
      </PopupWithForm>
   )
}

export default AddPlacePopup;