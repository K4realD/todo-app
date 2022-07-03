function Popup({name, isOpen, onClose, title, children, handleSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button
            type="button"
            aria-label="Close"
            className="popup__close-btn"
            onClick={onClose}
          ></button>
          <form className="form" name={name} onSubmit={handleSubmit}>
            <h2 className="form__heading">{title}</h2>
             {children}
             <button type="submit" aria-label="Save" className="form__submit-btn">
                Сохранить
              </button>
          </form>
        </div>
      </div>

    )
}
export default Popup