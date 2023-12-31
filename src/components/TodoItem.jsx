import React, { useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const text = todo.todo;
  const [checked, setChecked] = useState(todo.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    onUpdate({ ...todo, todo: updatedText });
    setIsEditing(false);
    setUpdatedText(updatedText);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedText(text);
  };
  const handleToggleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
    setUpdatedText(text);
  };
  const handleDelete = () => onDelete(todo);

  const handleCheckChange = () => {
    setChecked((prevCheck) => {
      onUpdate({ ...todo, isCompleted: !prevCheck });
      return !prevCheck;
    });
  };

  return (
    <li className="flex justify-between py-2">
      <label>
        <input
          className="w-4 h-4"
          type="checkbox"
          onChange={handleCheckChange}
          checked={checked}
        />
        <span className="pl-4">
          {isEditing ? (  
            <input
              className="pr-16"
              type="text"
              data-testid="modify-input"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
          ) : (
            <span>{text}</span>
          )}
        </span>
      </label>
      <div>
        {isEditing ? (
          <>
            <button 
              className="mr-2" 
              data-testid="submit-button" 
              onClick={handleUpdate}
            >
              제출
            </button>
            <button 
              data-testid="cancel-button" 
              onClick={handleCancel}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <button 
              className="mr-2" 
              data-testid="modify-button" 
              onClick={handleToggleEdit}
            >
              수정
            </button>
            <button 
              data-testid="delete-button" 
              onClick={handleDelete}
            >
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}
