const express = require('express');
const db = require('../database/db');

const router = express.Router();

// List (GET všech zvířat) – s názvem druhu a opatrovníka
router.get('/zvirata', (req, res) => {
  db.all(
    `SELECT zvirata.*, druhy.nazev AS druh, opatrovnici.jmeno AS opatrovnik_jmeno, opatrovnici.prijmeni AS opatrovnik_prijmeni
     FROM zvirata
     JOIN druhy ON zvirata.druh_id = druhy.id
     JOIN opatrovnici ON zvirata.opatrovnik_id = opatrovnici.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Read (GET detail jednoho zvířete)
router.get('/zvirata/:id', (req, res) => {
  db.get(
    `SELECT zvirata.*, druhy.nazev AS druh, opatrovnici.jmeno AS opatrovnik_jmeno, opatrovnici.prijmeni AS opatrovnik_prijmeni
     FROM zvirata
     JOIN druhy ON zvirata.druh_id = druhy.id
     JOIN opatrovnici ON zvirata.opatrovnik_id = opatrovnici.id
     WHERE zvirata.id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Zvíře nenalezeno' });
      res.json(row);
    }
  );
});

// Create (POST nové zvíře)
router.post('/zvirata', (req, res) => {
  const { jmeno, vek, druh_id, opatrovnik_id, popis } = req.body; // přidán popis
  db.run(
    'INSERT INTO zvirata (jmeno, vek, druh_id, opatrovnik_id, popis) VALUES (?, ?, ?, ?, ?)', // přidán popis
    [jmeno, vek, druh_id, opatrovnik_id, popis], // přidán popis
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.all(
        `SELECT zvirata.*, druhy.nazev AS druh, opatrovnici.jmeno AS opatrovnik_jmeno, opatrovnici.prijmeni AS opatrovnik_prijmeni
         FROM zvirata
         JOIN druhy ON zvirata.druh_id = druhy.id
         JOIN opatrovnici ON zvirata.opatrovnik_id = opatrovnici.id`,
        [],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json(rows);
        }
      );
    }
  );
});

// Update (PUT aktualizace zvířete)
router.put('/zvirata/:id', (req, res) => {
  const { jmeno, vek, opatrovnik_id, druh_id, popis } = req.body; // přidán popis
  db.run(
    'UPDATE zvirata SET jmeno = ?, vek = ?, opatrovnik_id = ?, druh_id = ?, popis = ? WHERE id = ?', // přidán popis
    [jmeno, vek, opatrovnik_id, druh_id, popis, req.params.id], // přidán popis
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Zvíře nenalezeno' });
      db.all(
        `SELECT zvirata.*, druhy.nazev AS druh, opatrovnici.jmeno AS opatrovnik_jmeno, opatrovnici.prijmeni AS opatrovnik_prijmeni
         FROM zvirata
         JOIN druhy ON zvirata.druh_id = druhy.id
         JOIN opatrovnici ON zvirata.opatrovnik_id = opatrovnici.id`,
        [],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(rows);
        }
      );
    }
  );
});

// Delete (DELETE zvíře)
router.delete('/zvirata/:id', (req, res) => {
  db.run('DELETE FROM zvirata WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Zvíře nenalezeno' });
    db.all(
      `SELECT zvirata.*, druhy.nazev AS druh, opatrovnici.jmeno AS opatrovnik_jmeno, opatrovnici.prijmeni AS opatrovnik_prijmeni
       FROM zvirata
       JOIN druhy ON zvirata.druh_id = druhy.id
       JOIN opatrovnici ON zvirata.opatrovnik_id = opatrovnici.id`,
      [],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
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