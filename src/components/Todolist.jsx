import React, { useState } from 'react';
import TodoItem from './TodoItem';
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
    <section className='flex flex-col w-2/7 h-3/4 p-4 m-auto bg-slate-100'>
      <AddTodo onAdd={handleAdd} />
      <ul className='flex-1 overflow-y-auto mt-2'>
        {
          todos.map((item) => (
            <TodoItem 
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

