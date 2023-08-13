import registerTrue from '../images/registerTrue.svg';
import registerFalse from '../images/registerFalse.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
   return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
         <div className="popup__container">
            <button type="button" className="popup__close" onClick={onClose} />
            <img
               src={isSuccess ? registerTrue : registerFalse}
               alt={isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'}
               className="popup__register-icon"
            />
            <h2 className="popup__register-title">
               {isSuccess
                  ? 'Вы успешно зарегистрировались!'
                  : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </h2>
         </div>
      </div>
   );
};

export default InfoTooltip;