const express = require('express');
const router = express.Router();
const { showNotes, createNewNote, validateNote } = require('../../lib/notes');
// desctructures note to access the array inside the JSON object
const { notesArray } = require('../../db/db.json');

// Get all notes
router.get('/notes', (req, res) => {
    let results = notesArray;
    if (req.query) {
      results = showNotes(req.query, results);
    }
    res.json(results);
});

// Add note
router.post('/notes', (req, res) => {
    req.body.id = notesArray.length.toString(); 

    // validates that note is correctly formatted
    if (!validateNote(req.body)) {
        res.status(400).send('Note is not formatted correctly!');
    } else {
        const note = createNewNote(req.body, notesArray);
        res.json(note);
    };
});


module.exports = router;