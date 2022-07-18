import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import CommentList from "../CommentList/CommentList.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, fetchComments } from "../../store/todoSlice.js";
import {
  setAddCommentOpen,
  closeAllPopups,
  toggleButtonActive,
} from "../../store/popupSlice.js";
import {
  setComment,
  setCommentValidity,
  setCommentError,
} from "../../store/inputSlice.js";
import { useEffect } from "react";
import AddCommentPopup from "../AddCommentPopup/AddCommentPopup.js";

function Task() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos.todos);
  const comments = useSelector((state) => state.todos.comments);
  const popup = useSelector((state) => state.popup);
  const input = useSelector((state) => state.input);

  const task = todos.find((f) => f.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  useEffect(() => {
    if (input.comment.valid) {
      dispatch(toggleButtonActive(true));
    } else {
      dispatch(toggleButtonActive(false));
    }
  });

  const handleAddComment = (evt) => {
    evt.preventDefault();
    dispatch(addComment({ id: id, text: input.comment.value }));
    dispatch(closeAllPopups());
    dispatch(setComment(""));
  };

  const checkCommentValidity = (element) => {
    if (!element.validity.valid) {
      dispatch(setCommentValidity(false));
      dispatch(setCommentError(element.validationMessage));
    } else {
      dispatch(setCommentValidity(true));
      dispatch(setCommentError(""));
    }
  };

  const handleSetComment = (evt) => {
    dispatch(setComment(evt.target.value));
    checkCommentValidity(evt.target);
  };

  return (
    <>
      <Header title={task.title} />
      <CommentList
        task={task}
        comments={comments}
        handleOpenComment={() => dispatch(setAddCommentOpen())}
      />
      <Footer />
      <AddCommentPopup
        isActive={popup.isButtonActive}
        input={input}
        handleComment={handleSetComment}
        isOpen={popup.isAddCommentOpen}
        handleSubmit={handleAddComment}
        onClose={() => dispatch(closeAllPopups())}
      ></AddCommentPopup>
    </>
  );
}

export default Task;
