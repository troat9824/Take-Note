const router = require('express').Router();
const { notes } = require('../../db/db.json');
const {     createNewNote, validateNote, filterByQuery, findById } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
  
  router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  

  module.exports = router;