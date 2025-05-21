import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getTodos = () => axios.get(`${API_BASE_URL}/todos`);

export const addTodo = (text) => axios.post(`${API_BASE_URL}/todos`, { text });

export const deleteTodo = (id) => axios.delete(`${API_BASE_URL}/todos/${id}`);

export const summarizeTodos = () => axios.post(`${API_BASE_URL}/summarize`);
