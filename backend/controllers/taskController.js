const { db } = require("../database/database");

// Get all tasks
function getTasks(req, res) {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch tasks"
            });
        }

        res.json(rows);
    });
}

// Create a task
function createTask(req, res) {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    db.run(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Failed to create task"
                });
            }

            res.status(201).json({
                id: this.lastID,
                title,
                completed: 0
            });
        }
    );
}

// Update task
function updateTask(req, res) {
    const { id } = req.params;
    const { completed } = req.body;

    db.run(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        [completed ? 1 : 0, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Failed to update task"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.json({
                message: "Task updated successfully"
            });
        }
    );
}

// Delete task
function deleteTask(req, res) {
    const { id } = req.params;

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: "Failed to delete task"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.json({
                message: "Task deleted successfully"
            });
        }
    );
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};