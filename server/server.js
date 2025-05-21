const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const { summarizeTodos } = require('./controllers/todoController');

const app = express();

// ✅ Allow multiple frontend origins
const allowedOrigins = [
  'https://todo-summary-assistant-jagans-projects-1eacbb43.vercel.app', // Your production frontend
  'https://todo-summary-assistant-8ncntxu2l-jagans-projects-1eacbb43.vercel.app', // For local development
];

// ✅ Dynamic CORS origin check
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use('/todos', todoRoutes);
app.post('/summarize', summarizeTodos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
