import React from 'react';

function TodoItem({ todo, onDelete }) {
  return (
    <li className="todo-item">
      {todo.text}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
