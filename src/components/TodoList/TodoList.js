import { Link, useRouteMatch } from "react-router-dom";
import "./TodoList.css";

function TodoList({ handleLimit, filteredTodo, handleDelete }) {
  return (
    <section className="elements">
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
                onClick={handleDelete.bind(todo.id)}
              >
                &times;
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        aria-label="Load"
        className="elements__load-btn"
        onClick={handleLimit}
      >
        Больше задач богу задач
      </button>
    </section>
  );
}

export default TodoList;
