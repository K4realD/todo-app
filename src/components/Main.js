import Header from "./Header.js";
import Footer from "./Footer.js";
import Popup from "./Popup.js";
import { Suspense, useEffect, lazy} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, setLimit} from "../store/todoSlice.js";
import { setAddTaskOpen, closeAllPopups } from "../store/popupSlice.js";
import { setText, setTitle, setSearch } from "../store/inputSlice.js";

const LazyTodoList = lazy(() => import("./TodoList"))

function Main() {
  const dispatch = useDispatch();

  const popup = useSelector((state) => state.popup);
  const input = useSelector((state) => state.input);
  const todo = useSelector((state) => state.todos);
  const handleAddTodo = (evt) => {
    evt.preventDefault();
    dispatch(addTodo({ title: input.title, text: input.text }));
    dispatch(closeAllPopups());
    dispatch(setText(""));
    dispatch(setTitle(""));
  };

  useEffect(() => {
      dispatch(fetchTodos(todo.limit))
  }, [todo.limit])

  return (
    <>
      <Header title={"Список задач"} />
      <main className="content">
        <section className="new-todo">
        <input
          type="text"
          name="search"
          placeholder="Поиск..."
          className="search"
          id="search-input"
          value={input.search}
          onChange={(evt) => {
            dispatch(setSearch(evt.target.value))
        }}
        ></input>
          <button
            type="button"
            aria-label="Add"
            className="new-todo__add-btn"
            onClick={() => dispatch(setAddTaskOpen())}
          ></button>
        </section>
        <section className="elements">
        <Suspense fallback={<h2 className={"elemets__load"}>Загрузка...</h2>}>
          <LazyTodoList />
        </Suspense>
          <button
            type="button"
            aria-label="Load"
            className="elements__load-btn"
            onClick={() => dispatch(setLimit())}
          >Больше задач богу задач</button>
        </section>
      </main>
      <Footer />
      <Popup
        name="task"
        title="Новая задача"
        isOpen={popup.isAddTaskOpen}
        handleSubmit={handleAddTodo}
        onClose={() => dispatch(closeAllPopups())}
      >
        <fieldset className="form__container">
          <input
            type="text"
            name="name"
            placeholder="Название задачи"
            className="form__item"
            id="title-input"
            value={input.title}
            onChange={(evt) => {
              dispatch(setTitle(evt.target.value));
            }}
          />
          <input
            type="text"
            name="info"
            className="form__item"
            id="info-input"
            placeholder="Описание задачи"
            value={input.text}
            onChange={(evt) => {
              dispatch(setText(evt.target.value));
            }}
          />
        </fieldset>
      </Popup>
    </>
  );
}

export default Main;
