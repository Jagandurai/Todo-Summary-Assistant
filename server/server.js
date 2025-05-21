const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const { summarizeTodos } = require('./controllers/todoController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);
app.post('/summarize', summarizeTodos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
