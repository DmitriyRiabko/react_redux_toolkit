import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
        { params: { _limit: 10 } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );

      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);

    try {
      const res = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          completed: !todo.completed,
        }
      );

      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {

    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const res = await axios.post(
        `https://jsonplaceholder.typicode.com/todos/`,
        {
          ...todo,
        }
      );

      dispatch(addTodo(res.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      (state.status = "loading"), (state.error = null);
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      (state.status = "resolved"), (state.todos = action.payload);
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;
