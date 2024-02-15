import React from "react";

export default function InputField({text,setText,handleAdd}) {
  return (
    <label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>
    </label>
  );
}
