import React, { useEffect, useState } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  summarizeTodos,
} from './api';
import TodoItem from './components/TodoItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false); 

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos([...res.data].reverse());
    } catch (err) {
      console.error('Error fetching todos:', err);
      toast.error('Failed to fetch todos');
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return toast.warn('Please enter a todo');
    try {
      await addTodo(newTodo);
      setNewTodo('');
      toast.success('Todo added successfully');
      fetchTodos();
    } catch (err) {
      console.error('Error adding todo:', err);
      toast.error('Failed to add todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success('Todo deleted successfully');
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
      toast.error('Failed to delete todo');
    }
  };

  const handleSummarize = async () => {
    if (todos.length === 0) {
      toast.error('Please add todo list');
      return;
    }

    setLoading(true); 
    try {
      const res = await summarizeTodos();
      toast.success(res.data.message || 'Summary sent to Slack!');
    } catch (err) {
      console.error('Error summarizing:', err);
      toast.error('Failed to send summary to Slack');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>Todo Summary Assistant</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>

      <div className="summary-section">
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? 'Sending to Slack...' : 'Summarize & Send to Slack'}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
