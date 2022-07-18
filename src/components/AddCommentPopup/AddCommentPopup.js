import "./AddCommentPopup.css";
import Popup from "../Popup/Popup.js";

function AddCommentPopup({
  isOpen,
  onClose,
  handleSubmit,
  input,
  handleComment,
  isActive
}) {
  return (
    <Popup
      name="comment"
      title="Новый комментарий"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isActive={isActive}
    >
      <fieldset className="form__container">
        <input
          type="text"
          name="comment"
          minLength="2"
          maxLength="100"
          required
          placeholder="Напишите комментарий"
          className="form__item"
          id="comment-input"
          value={input.comment.value}
          onChange={handleComment}
        />
        <span className="form__input-error">{input.comment.errorMessage}</span>
      </fieldset>
    </Popup>
  );
}

export default AddCommentPopup;
