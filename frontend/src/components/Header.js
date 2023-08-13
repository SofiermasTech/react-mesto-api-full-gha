import React from "react";
import logo from '../images/logo-white.svg';
import { Link, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, userEmail, onSignOut }) => {
   const location = useLocation();
   return (
      <header className="header">
         <img
            src={logo}
            alt="Логотип проекта Место."
            className="header__logo"
         />

         <div className="header__nav">
            {location.pathname === '/sign-in' && (
               <Link to="/sign-up" className="header__link">Регистрация</Link>
            )}
            {location.pathname === '/sign-up' && (
               <Link to="/sign-in" className="header__link">Войти</Link>
            )}
         </div>

         {isLoggedIn && (
            <nav className="header__email">
               <span>{userEmail}</span>
               <button className="header__btn-out" onClick={() => onSignOut()}>
                  Выйти
               </button>
            </nav>
         )}

      </header>
   )
}

export default Header;