const router = require('express').Router();
const { notes } = require('../../db/db.json');
const {createNote, deleteNote } = require('../../lib/notes.js');

router.get('/api/notes',(req,res)=>{
    let results = notes;
    console.log(results);
    res.json(results);
});

router.post('/api/notes',(req,res)=>{
    req.body.id = notes.length.toString();
    createNote(req.body, notes);
    res.json(req.body);
});

router.delete('/api/notes/:id', (req,res)=>{
    deleteNote(notes,req.params.id);
    res.json(notes);
});

module.exports = router;