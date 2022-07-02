import Header from "./Header.js";
import Footer from "./Footer.js";
import CommentList from "./CommentList.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, fetchComments } from "../store/todoSlice.js";
import { setAddCommentOpen, closeAllPopups } from "../store/popupSlice.js";
import { setComment } from "../store/inputSlice.js";
import { useEffect } from "react";
import Popup from "./Popup.js";

function Task() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos.todos);
  const comments = useSelector((state) => state.todos.comments)
  const popup = useSelector((state) => state.popup);
  const input = useSelector((state) => state.input);
  const task = todos.find((f) => f.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch]);

  const handleAddComment = (evt) => {
    evt.preventDefault();
    dispatch(addComment({id: id ,text: input.comment}));
    dispatch(closeAllPopups());
    dispatch(setComment(""));
  };

  return (
    <>
      <Header title={task.title} />
      <div className="task">
        <p className="task__text">{task.text}</p>
        <CommentList task={task} comments={comments}/>
        <button
          type="button"
          aria-label="Add"
          className="task__add-btn"
          onClick={() => dispatch(setAddCommentOpen())}
        >
          Добавить комментарий
        </button>
      </div>
      <Footer />
      <Popup
        name="comment"
        title="Новый комментарий"
        isOpen={popup.isAddCommentOpen}
        handleSubmit={handleAddComment}
        onClose={() => dispatch(closeAllPopups())}
      >
        <fieldset className="form__container">
          <input
            type="text"
            name="comment"
            placeholder="Напишите комментарий"
            className="form__item"
            id="comment-input"
            value={input.comment}
            onChange={(evt) => {
              dispatch(setComment(evt.target.value));
            }}
          />
        </fieldset>
      </Popup>
    </>
  );
}

export default Task;
