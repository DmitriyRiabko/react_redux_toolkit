import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/todoSlice";
import { toggleStatus } from "../store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span style={completed ? { textDecoration: "line-through" } : null}>
        {title}
      </span>
      <span
        onClick={() => dispatch(deleteTodo(id))}
        style={{ color: "red", cursor: "pointer" }}
      >
        {" "}
        &times;
      </span>
    </li>
  );
};

export default TodoItem;
