const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./routes/taskRoutes");
const { initializeDatabase } = require("./database/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running"
    });
});

// Initialize database
initializeDatabase();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});