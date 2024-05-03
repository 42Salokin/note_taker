const router = require('express').Router();

router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Make POST route to receive new note, send to db.json, assign unique id, return to client

// Make DELETE route to receive query param with unique id of note to be deleted,
// read all notes from db.json, delete note with that id, and rewrite all remaining notes back to json
module.exports = router;
