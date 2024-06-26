const router = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, readDeleteAndAppend } = require('../helpers/fsUtils');



router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Make POST route to receive new note, send to db.json, assign unique id, return to client
router.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });

router.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} received`);
    const noteID = req.params.id;
        if (noteID) {
            console.log('checking delete...');

            readDeleteAndAppend(noteID, './db/db.json')
            console.log(`Note ${noteID} deleted successfully`);

            res.json({ ok:true });
        } else {
            res.status(500).json({ error: 'Note not deleted'});
        };
        // } else {
        //     res.status(404).json({ error: 'Note not found'});
        //     console.log('Note not found');
        // }
    });
// Make DELETE route to receive query param with unique id of note to be deleted,
// read all notes from db.json, delete note with that id, and rewrite all remaining notes back to json
module.exports = router;

