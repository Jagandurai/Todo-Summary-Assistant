# 🧠 Todo Summary Assistant – Backend

This is the backend service for the **Todo Summary Assistant**. It manages todos, summarizes them using OpenAI, and sends summaries to Slack.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js** – RESTful API
- **Supabase** – PostgreSQL backend
- **OpenAI** – LLM summarization
- **Slack** – Summary delivery
- **dotenv** – Config management

---

## ⚙️ Setup Instructions

### 1. Clone and install
```bash
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant/server
npm install

---------------------------------------------------------------------


📦 Supabase SQL Schema

create table if not exists todos (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  created_at timestamp with time zone default now()
);
select * from todos;


---------------------------------------------------------------------

.env.example 

SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
OPENAI_API_KEY=your_openai_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
PORT=5000


---------------------------------------------------------------------


🔌 API Endpoints

| Method | Route              | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/todos`           | Fetch all todos                   |
| POST   | `/todos`           | Add a new todo                    |
| DELETE | `/todos/:id`       | Delete a todo by ID               |
| POST   | `/todos/summarize` | Summarize todos and send to Slack |


---------------------------------------------------------------------


🔗 Slack Setup

1.Go to Slack Apps

2.Create a new app → Enable Incoming Webhooks

3.Add a new webhook to your workspace

4.Copy the URL and set it as SLACK_WEBHOOK_URL in .env


---------------------------------------------------------------------


🤖 OpenAI Setup

1.Create an account on OpenAI

2.Generate an API key

3.Add it to .env as OPENAI_API_KEY

4.Used for summarizing todos using GPT (e.g., gpt-3.5-turbo)


---------------------------------------------------------------------


📐 Architecture & Design

1.Modular Code Structure

    1.1 Routes (routes/todoRoutes.js)

    1.2 Controllers (controllers/todoController.js)

    1.3 Utilities (utils/openai.js, utils/slack.js)

2.Clean Error Handling

    2.1 Validates input, handles external API errors

3.Extensible

    3.1 Easy to add authentication or more features later


---------------------------------------------------------------------


🚀 Run the Server

    npm start
