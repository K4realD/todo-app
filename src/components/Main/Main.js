import "./Main.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import AddTaskPopup from "../AddTaskPopup/AddTaskPopup.js";
import SetTodo from "../SetTodo/SetTodo.js";
import { Suspense, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  setLimit,
  deleteTodo,
  deleteComments,
} from "../../store/todoSlice.js";
import {
  setAddTaskOpen,
  closeAllPopups,
  toggleButtonActive,
} from "../../store/popupSlice.js";
import {
  setText,
  setTitle,
  setSearch,
  setTitleValidity,
  setTextValidity,
  setTitleError,
  setTextError,
} from "../../store/inputSlice.js";

const LazyTodoList = lazy(() => import("../TodoList/TodoList.js"));

function Main() {
  const dispatch = useDispatch();

  const popup = useSelector((state) => state.popup);
  const input = useSelector((state) => state.input);
  const todos = useSelector((state) => state.todos);

  const comments = useSelector((state) => state.todos.comments);

  const handleAddTodo = (evt) => {
    evt.preventDefault();
    dispatch(addTodo({ title: input.title.value, text: input.text.value }));
    dispatch(closeAllPopups());
    dispatch(setText(""));
    dispatch(setTitle(""));
  };

  const handleSetTitle = (evt) => {
    dispatch(setTitle(evt.target.value));
    checkTitleValidity(evt.target);
  };

  const handleSetText = (evt) => {
    dispatch(setText(evt.target.value));
    checkTextValidity(evt.target);
  };

  const handleSetLimit = () => {
    dispatch(setLimit());
  };

  const handleSetSearch = (evt) => {
    dispatch(setSearch(evt.target.value));
  };

  const checkTitleValidity = (element) => {
    if (!element.validity.valid) {
      dispatch(setTitleValidity(false));
      dispatch(setTitleError(element.validationMessage));
    } else {
      dispatch(setTitleError(""));
      dispatch(setTitleValidity(true));
    }
  };

  const checkTextValidity = (element) => {
    if (!element.validity.valid) {
      dispatch(setTextValidity(false));
      dispatch(setTextError(element.validationMessage));
    } else {
      dispatch(setTextError(""));
      dispatch(setTextValidity(true));
    }
  };

  function handleDeleteTodo() {
    comments.map((comment) => {
      if (comment._id === this) {
        dispatch(deleteComments(comment.id));
      }
    });
    dispatch(deleteTodo(this));
  }

  const filteredTodo = todos.todos.filter((todo) => {
    return todo.title.toLowerCase().includes(input.search.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchTodos(todos.limit));
  }, [todos.limit]);

  useEffect(() => {
    if (input.title.valid && input.text.valid) {
      dispatch(toggleButtonActive(true));
    } else {
      dispatch(toggleButtonActive(false));
    }
  });

  return (
    <>
      <Header title={"Список задач"} />
      <main className="content">
        <SetTodo
          input={input.search}
          handleSearch={handleSetSearch}
          handleOpenPopup={() => dispatch(setAddTaskOpen())}
        ></SetTodo>
        <Suspense className={"elemets__load"} fallback={<h2>Загрузка...</h2>}>
          <LazyTodoList
            handleLimit={handleSetLimit}
            handleDelete={handleDeleteTodo}
            filteredTodo={filteredTodo}
          />
        </Suspense>
      </main>
      <Footer />
      <AddTaskPopup
        isOpen={popup.isAddTaskOpen}
        handleSubmit={handleAddTodo}
        onClose={() => dispatch(closeAllPopups())}
        input={input}
        handleChangeTitle={handleSetTitle}
        handleChangeText={handleSetText}
        isActive={popup.isButtonActive}
      ></AddTaskPopup>
    </>
  );
}

export default Main;
