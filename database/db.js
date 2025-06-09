const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const dbExists = fs.existsSync(dbPath);

const db = new sqlite3.Database(dbPath);

if (!dbExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema, (err) => {
    if (err) console.error('Error initializing schema:', err.message);
    else {
      console.log('Database schema loaded.');
      const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
      db.exec(seed, (err) => {
        if (err) console.error('Error seeding database:', err.message);
        else console.log('Database seeded.');
      });
    }
  });
}

module.exports = db;

