const express = require('express');
const db = require('../database/db');

const router = express.Router();

// List (GET všech zvířat)
router.get('/zvirata', (req, res) => {
  db.all('SELECT * FROM zvirata', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Read (GET detail jednoho zvířete)
router.get('/zvirata/:id', (req, res) => {
  db.get('SELECT * FROM zvirata WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Zvíře nenalezeno' });
    res.json(row);
  });
});

// Create (POST nové zvíře)
router.post('/zvirata', (req, res) => {
  const { jmeno, vek, druh, opatrovnik_id } = req.body;
  db.run(
    'INSERT INTO zvirata (jmeno, vek, druh, opatrovnik_id) VALUES (?, ?, ?, ?)',
    [jmeno, vek, druh, opatrovnik_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      // Po úspěchu vrátíme aktuální seznam
      db.all('SELECT * FROM zvirata', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(rows);
      });
    }
  );
});

// Update (PUT aktualizace zvířete)
router.put('/zvirata/:id', (req, res) => {
  const { jmeno, vek, opatrovnik_id } = req.body;
  db.run(
    'UPDATE zvirata SET jmeno = ?, vek = ?, opatrovnik_id = ? WHERE id = ?',
    [jmeno, vek, opatrovnik_id, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Zvíře nenalezeno' });
      // Po úspěchu vrátíme aktuální seznam
      db.all('SELECT * FROM zvirata', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    }
  );
});

// Delete (DELETE zvíře)
router.delete('/zvirata/:id', (req, res) => {
  db.run('DELETE FROM zvirata WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Zvíře nenalezeno' });
    // Po úspěchu vrátíme aktuální seznam
    db.all('SELECT * FROM zvirata', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
});

// List opatrovníků (pro výběr v UI)
router.get('/opatrovnici', (req, res) => {
  db.all('SELECT * FROM opatrovnici', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// List druhů zvířat
router.get('/druhy', (req, res) => {
  db.all('SELECT * FROM druhy', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;