import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (limit, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3100/todos?_limit=${limit}`);
      if (!res.ok) {
        throw new Error("Серверная ошибка");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "todos/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3100/todos`);
      if (!res.ok) {
        throw new Error("Серверная ошибка");
      }
      const data = await res.json();
      return data;
    }
     catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async ({ title, text }, { rejectWithValue }) => {
    try {
      const todo = {
        title: title,
        text: text,
      };
      const res = await fetch("http://localhost:3100/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!res.ok) {
        throw new Error("Невозможно добавить задачу. Серверная ошибка");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "todo/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3100/comments");
      if (!res.ok) {
        throw new Error("Серверная ошибка");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
); 

export const addComment = createAsyncThunk(
  "todo/addComment",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const comment = {
        _id: id,
        text: text,
      };
      const res = await fetch("http://localhost:3100/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!res.ok) {
        throw new Error("Невозможно добавить комментарий. Серверная ошибка");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`http://localhost:3100/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Невозможно удалить задачу. Серверная ошибка");
      }
      const data = await res.json();
      dispatch(removeTodo({id}))
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteComments = createAsyncThunk(
  "todo/deleteComments",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3100/comments?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Невозможно удалить комментарий. Серверная ошибка");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    comments: [],
    status: null,
    error: null,
    limit: 3,
    task: {id: "", title: "", text: ""}
  },
  reducers: {
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
  },
    setLimit(state) {
      state.limit = state.limit + 3;
    },
    setTask(state, action) {
      state.task = state.todos.find((f) => f.id === action.payload);
    }
  },
  extraReducers: {
    
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.comments = action.payload;
    },
    [addTodo.fulfilled]: (state, action) => {
      state.status = "todo resolved";
      state.todos.push(action.payload)
    },
    [deleteTodo.fulfilled]: (state) => {
      state.status = "todo resolved";
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.status = "todo resolved";
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    [addComment.fulfilled]: (state, action) => {
      state.status = "comment resolved";
      state.comments.push(action.payload);
    },
    [fetchTodos.rejected]: setError,
    [addTodo.rejected]: setError,
    [fetchComments.rejected]: setError,
    [addComment.rejected]: setError,
    [deleteComments.rejected]: setError,
    [deleteTodo.rejected]: setError,
  },
});
export const {removeTodo, setLimit, setTask} = todoSlice.actions
export default todoSlice.reducer;
