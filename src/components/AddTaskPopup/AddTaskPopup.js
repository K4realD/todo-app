import "./AddTaskPopup.css";
import Popup from "../Popup/Popup.js";

function AddTaskPopup({
  isOpen,
  onClose,
  handleSubmit,
  input,
  handleChangeTitle,
  handleChangeText,
  isActive
}) {
  return (
    <Popup
      name="task"
      title="Новая задача"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isActive={isActive}
    >
      <fieldset className="form__container">
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название задачи"
          className="form__item"
          id="title-input"
          value={input.title.value}
          onChange={handleChangeTitle}
        />
        <span className="form__input-error">{input.title.errorMessage}</span>
        <input
          type="text"
          name="info"
          minLength="2"
          maxLength="100"
          required
          className="form__item"
          id="info-input"
          placeholder="Описание задачи"
          value={input.text.value}
          onChange={handleChangeText}
        />
        <span className="form__input-error">{input.text.errorMessage}</span>
      </fieldset>
    </Popup>
  );
}
export default AddTaskPopup;
