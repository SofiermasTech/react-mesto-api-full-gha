import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from '../utils/auth.js';

function App() {

   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [selectedCard, setSelectedCard] = useState({});
   const [currentUser, setCurrentUser] = useState({
      name: "",
      about: "",
      avatar: "",
      _id: "",
      cohort: "",
      email: "",
      password: "",
   });

   const [cards, setCards] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [statusRegistration, setStatusRegistration] = useState(false);
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [email, setEmail] = useState('');
   const navigate = useNavigate();


   function tokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
         auth
            .checkToken(token)
            .then((res) => {
               setEmail(res.data.email);
               setIsLoggedIn(true);
               navigate("/main", { replace: true });
            })
            .catch((err) => { console.log(`Возникла ошибка, ${err}`) })
      } else {
         return;
      }
      console.log(token);
   }

   useEffect(() => {
      tokenCheck();
   }, []);

   useEffect(() => {
      if (isLoggedIn) {
         navigate('/main');
      }
   }, [navigate, isLoggedIn]);

   useEffect(() => {
      if (isLoggedIn) {
         Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, initialCards]) => {
               setCurrentUser(userData);
               setCards(initialCards);
            })
            .catch((err) => {
               console.log(`Ошибка: ${err}`);
            });
      }
   }, [isLoggedIn]);

   const handleInfoTooltip = () => {
      setIsInfoTooltipOpen(true);
   };

   const handleEditAvatarClick = () => {
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
   };

   const handleEditProfileClick = () => {
      setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
   };

   const handleAddPlaceClick = () => {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
   };

   const handleCardClick = card => {
      setSelectedCard(card);
   };

   const handleUpdateAvatar = (data) => {
      api
         .setUserAvatar(data)
         .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         });
   };

   const handleUpdateUser = (newUserInfo) => {
      api
         .setUserInfo(newUserInfo)
         .then((data) => {
            setCurrentUser(data)
            closeAllPopups();
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         });
   };

   function handleCardLike(card) {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      api
         .changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
            setCards((state) =>
               state.map((c) => (c._id === card._id ? newCard : c))
            );
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         });
   }

   function handleCardDelete(cardId) {
      api
         .deleteCard(cardId)
         .then(() => {
            setCards((cards) => cards.filter(card => card._id !== cardId));
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         });
   };

   const handleAddPlaceSubmit = (newData) => {
      api
         .addNewCard(newData)
         .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
         })
         .catch((err) => {
            console.log(`Ошибка: ${err}`);
         });
   };

   const closeAllPopups = () => {
      setIsInfoTooltipOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard({});
   }

   // ПР12
   function handleRegistration(data) {
      return auth
         .register(data)
         .then(() => {
            setStatusRegistration(true);
            setIsInfoTooltipOpen(true);
            navigate('/sign-in', { replace: true });
         })
         .catch((err) => {
            console.log(`Ошибка регистрации, ${err}`);
            setStatusRegistration(false);
            setIsInfoTooltipOpen(true);
         })
         .finally(handleInfoTooltip);
   };

   function handleLogin({ password, email }) {
      return auth
         .authorize({ password, email })
         .then((data) => {
            if (data) {
               setIsLoggedIn(true);
               localStorage.setItem('token', data.token);
               tokenCheck();
               navigate('/main');
            }
         })
         .catch((err) => {
            console.log(`Ошибка авторизации, ${err}`);
            setIsInfoTooltipOpen(true);
         });
   };

   function onSignOut() {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/sign-in');
   }

   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="page">
            <Header isLoggedIn={isLoggedIn} userEmail={email} onSignOut={onSignOut} />
            <Routes>
               <Route path="/" element={isLoggedIn ? (<Navigate to="/main" />
               ) : (<Navigate to="/sign-in" replace />)}
               />
               <Route path="/sign-in" element={<Login onLogin={handleLogin} />}
               />
               <Route path="/sign-up" element={<Register onRegister={handleRegistration} />}
               />
               <Route path="/main" element={
                  <ProtectedRoute
                     element={Main}
                     isLoggedIn={isLoggedIn}
                     onEditAvatar={handleEditAvatarClick}
                     onEditProfile={handleEditProfileClick}
                     onAddPlace={handleAddPlaceClick}
                     onCardClick={handleCardClick}
                     cards={cards}
                     onCardLike={handleCardLike}
                     onCardDelete={handleCardDelete}
                  />
               }
               />
            </Routes>
            <Footer />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={statusRegistration} />

            <section className="popup popup-delete">
               <div className="popup__container">
                  <button type="button" className="popup__close" aria-label="Закрыть форму"></button>
                  <h3 className="popup__title">Вы уверены?</h3>
                  <form className="popup__form" name="deleteCard" noValidate>
                     <button type="submit" className="popup__submit" aria-label="Сохранить">Да</button>
                  </form>
               </div>
            </section>

         </div>
      </CurrentUserContext.Provider>
   );
}

export default App;
