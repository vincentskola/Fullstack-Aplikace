const fs = require('fs');
const path = require('path');
const db = require('./db');

const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
db.exec(seed, (err) => {
  if (err) {
    console.error('Chyba při seedování:', err.message);
  } else {
    console.log('Seedování dokončeno.');
  }
  process.exit();
});