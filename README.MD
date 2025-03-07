# TODO API Documentation

## 📌 Overview
This is a RESTful API for managing TODO tasks using **Node.js, Express, and MongoDB**. The API supports:

- Creating tasks
- Fetching all tasks
- Fetching tasks in progress
- Fetching completed tasks

## 🚀 Base URL
```
http://localhost:5000
```

---

## 📌 Endpoints

### **1️⃣ Create a Task**
**Endpoint:** `POST /tasks`

**Request Body (JSON):**
```json
{
  "title": "Buy Groceries",
  "description": "Milk, Bread, and Eggs",
  "status": "pending",  
  "priority": "high",
  "dueDate": "2025-03-10T00:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "_id": "some_generated_id",
  "title": "Buy Groceries",
  "description": "Milk, Bread, and Eggs",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-03-10T00:00:00Z",
  "createdAt": "2025-03-04T12:34:56Z",
  "__v": 0
}
```

---

### **2️⃣ Fetch All Tasks**
**Endpoint:** `GET /tasks`

**Response (200 OK):**
```json
[
  {
    "_id": "some_id",
    "title": "Buy Groceries",
    "description": "Milk, Bread, and Eggs",
    "status": "pending",
    "priority": "high",
    "dueDate": "2025-03-10T00:00:00Z",
    "createdAt": "2025-03-04T12:34:56Z",
    "__v": 0
  }
]
```

---

### **3️⃣ Fetch In-Progress Tasks**
**Endpoint:** `GET /tasks/progress`

**Response (200 OK):**
```json
[
  {
    "_id": "some_id",
    "title": "Project Work",
    "description": "Work on API integration",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2025-03-15T00:00:00Z",
    "createdAt": "2025-03-04T12:34:56Z",
    "__v": 0
  }
]
```

---

### **4️⃣ Fetch Completed Tasks**
**Endpoint:** `GET /tasks/done`

**Response (200 OK):**
```json
[
  {
    "_id": "some_id",
    "title": "Read Book",
    "description": "Finished reading a novel",
    "status": "done",
    "priority": "low",
    "dueDate": "2025-03-05T00:00:00Z",
    "createdAt": "2025-03-04T12:34:56Z",
    "__v": 0
  }
]
```

---

## 🛠️ Setup & Run

### **1️⃣ Install Dependencies**
```bash
npm install express mongoose dotenv cors body-parser
```

### **2️⃣ Create a `.env` File**
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### **3️⃣ Start the Server**
```bash
node server.js
```
OR
```bash
npx nodemon server.js
```

✅ **Now your TODO API is running on `http://localhost:5000`!** 🚀

