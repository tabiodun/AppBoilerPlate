var queries = [
    'CREATE TABLE users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, hash TEXT, user_level TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
];

module.exports = queries;
