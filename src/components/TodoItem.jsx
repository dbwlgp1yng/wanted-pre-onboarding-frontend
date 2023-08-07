import React, { useId, useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
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
    <li className="flex justify-between py-2">
      <label className="">
        <input className="w-4 h-4" type="checkbox" id={`${itemId}`} onChange={handleChange} />
        <span className="pl-4">
          {isEditing ? (
            <input
              className="pr-16"
              type="text"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
          ) : (
            <span>{text}</span>
          )}
        </span>
      </label>
      <div>
        <button 
          className="mr-2"
          data-testid="modify-button" 
          onClick={isEditing ? handleUpdate : handleEditClick}
        >
          {isEditing ? "제출" : "수정"}
        </button>
        <button data-testid="delete-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </li>
  );
}
