import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../api/TodoAPI';

export default function Todolist() {
  const [todos, setTodos] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const fetchTodos = async () => {
    try {
      const response = await getTodos(accessToken);
      setTodos(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (todo) => {
    try {
      const newTodo = await createTodo(accessToken, todo.text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      const updated = await updateTodo(accessToken, updatedTodo.id, {
        todo: updatedTodo.todo,
        isCompleted: updatedTodo.isCompleted,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updated.id ? updated : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (deletedTodo) => {
    try {
      await deleteTodo(accessToken, deletedTodo.id);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deletedTodo.id)
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <section className='flex flex-col w-2/7 h-3/4 p-4 m-auto bg-slate-100'>
      <AddTodo onAdd={handleAdd} />
      <ul className='flex-1 overflow-y-auto mt-2 max-h-full'>
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

