const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./backend/database/tasks.db");

function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )
    `);

    console.log("Database initialized.");
}

module.exports = {
    db,
    initializeDatabase
};