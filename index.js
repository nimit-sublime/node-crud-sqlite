const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./db.sqlite');

// Create table if not exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, user TEXT, comments TEXT)");
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// GET all items
app.get('/items', (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST new item
app.post('/items', (req, res) => {
  const { task, user, comments } = req.body;
  db.run("INSERT INTO items (task, user, comments) VALUES (?, ?, ?)", [task, user, comments], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// PUT update item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { task, user, comments } = req.body;
  db.run("UPDATE items SET task = ?, user = ?, comments = ? WHERE id = ?", [task, user, comments, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// DELETE item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id = ?", id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
