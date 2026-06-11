const Database = require('better-sqlite3');
const db = new Database('blog.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at text NOT NULL DEFAULT (datetime('now')),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)  
    );
`);

module.exports = db;