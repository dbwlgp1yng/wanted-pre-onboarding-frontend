import React, { useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';


export default function Todolist() {
  const [todos, setTodos] = useState([]);
  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    setTodos(
      todos.map((t) =>
        t.id === updated.id ? updated : t
      )
    );
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));
  return (
    <section>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {
          todos.map((item) => (
            <Todo 
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        }
      </ul>
    </section>
  );
}

