# Todo Summary Assistant – Frontend (React)

This is the **frontend** of the Todo Summary Assistant project. It allows users to add, view, and delete todos through a simple UI, and trigger a summary of all todos which is then sent to a Slack channel via the backend.

---

## 🚀 Tech Stack

- **React** – Frontend framework
- **Axios** – For API requests
- **React Hooks** – For managing state and side-effects
- **CSS** – Styling (with support for responsive design)
- **Thunder Client** – For API testing (optional)

---

## 📁 Project Structure

client/
├── public/
│ ├── index.html
├── src/
│ ├── components/
│ │ └── TodoList.js # Renders the todo list UI
| ├── api.js # Handling all database operations with Supabase
│ ├── App.js # Main app component
│ ├── index.js # Entry point
│ └── App.css # custom CSS
├── .env # Contains backend URL
└── package.json


---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 📦 Install dependencies

```bash
cd client
npm install
npm start