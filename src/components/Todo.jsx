import React, { useId, useState } from "react";

export default function Todo({ todo, onUpdate, onDelete }) {
  const { text } = todo;
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedText, setUpdatedText] = useState(text);
  const itemId = useId();

  const handleChange = (e) => {
    onUpdate({ ...todo });
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedText(text); 
  };
  const handleUpdate = () => {
    onUpdate({ ...todo, text: updatedText });
    setIsEditing(false);
    setUpdatedText(updatedText);
  };
  const handleDelete = () => onDelete(todo);

  return (
    <li>
      <label>
        <input type="checkbox" id={`${itemId}`} onChange={handleChange} />
        <span>
          {isEditing ? (
            <input
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
          ) : (
            <span>{text}</span>
          )}
        </span>
      </label>
      <button 
        data-testid="modify-button" 
        onClick={isEditing ? handleUpdate : handleEditClick}
      >
        {isEditing ? "제출" : "수정"}
      </button>
      <button data-testid="delete-button" onClick={handleDelete}>
        삭제
      </button>
    </li>
  );
}
