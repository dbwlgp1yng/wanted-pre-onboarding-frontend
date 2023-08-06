import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim().length === 0) return;
    onAdd({ id: uuidv4(), text });
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="할 일을 작성해주세요."
        data-testid="new-todo-input"
        value={text}
        onChange={handleChange}
      />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
}
