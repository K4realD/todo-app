import "./CommentList.css";

function CommentList({ task, comments, handleOpenComment }) {
  return (
    <div className="task">
      <p className="task__text">{task.text}</p>
      <ul className="elements__list">
        {comments.map((comment) => {
          if (comment._id === task.id) {
            return (
              <li className="element element_place_comments" key={comment.id}>
                <h2 className="element__text">{comment.text}</h2>
              </li>
            );
          }
        })}
      </ul>
      <button
        type="button"
        aria-label="Add"
        className="task__add-btn"
        onClick={handleOpenComment}
      >
        Добавить комментарий
      </button>
    </div>
  );
}

export default CommentList;
