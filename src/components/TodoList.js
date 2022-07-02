import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComments, deleteTodo} from "../store/todoSlice";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const input = useSelector((state) =>(state.input));
  const comments = useSelector((state) => state.todos.comments);
  const dispatch = useDispatch();
  
  const filteredTodo = todos.filter((todo) => {
      return todo.title.toLowerCase().includes(input.search.toLowerCase())
  }) // реализация поиска по задачам

  return (
    <ul className="elements__list">
      {filteredTodo.map((todo) => {
        return (
          <li className="element element_place_todo" key={todo.id}>
            <Link to={`/${todo.id}`} className="element__link">
              <h2 className="element__title">{todo.title}</h2>
            </Link>
            <button
              type="button"
              aria-label="delete"
              className="element__delete-btn"
              onClick={() => {
                comments.map((comment) => {
                  if (comment._id === todo.id) {
                    dispatch(deleteComments(comment.id))
                  }
                })
                dispatch(deleteTodo(todo.id))
              }}
            >&times;</button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;