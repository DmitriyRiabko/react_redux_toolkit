import { useState,useEffect } from "react";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";

import { useDispatch, useSelector } from "react-redux";

import { addNewTodo ,fetchTodos} from "./store/todoSlice";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const {status,error} = useSelector(state=> state.todos)

  const addTask = () => {
    dispatch(addNewTodo(text));
    setText('')
  };

  useEffect(()=>{
    dispatch(fetchTodos())
  },[dispatch])

  return (
    <>
      <div>Redux Toolkit</div>
      <InputField text={text} setText={setText} handleAdd={addTask} />

      {status === 'loading' && <h1>Loading</h1>}
      {error && <h1>An error occured: {error}</h1>}

      <TodoList />
    </>
  );
}

export default App;
