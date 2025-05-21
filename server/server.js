const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const { summarizeTodos } = require('./controllers/todoController');

const app = express();

// ✅ Replace this line:
// app.use(cors());

// 🔐 Use this:
app.use(cors({
  origin: 'https://todo-summary-assistant-tau.vercel.app/', // Replace with your actual frontend Vercel URL
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use('/todos', todoRoutes);
app.post('/summarize', summarizeTodos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
