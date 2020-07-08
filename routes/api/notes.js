const express = require('express');
const router = express.Router();

//Note Model
let Note = require('../../models/Note');

//@route GET api/notes
//@desc Get All Notes
//@access Public
router.get('/', (req, res) => {
    Note.find().then(notes => res.json(notes));
});

//@route POST api/notes
//@desc Create A Note 
//@access Public
router.post('/', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({ title, content });
    newNote.save().then(() => res.json('Note added!')).catch(err => res.status(400).json('Error: ' + err));
});

//@route DELETE api/notes
//@desc Delete A Note 
//@access Public
router.delete('/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id).then(() => res.json('Note Deleted!')
        .catch(err => res.status(400).json('Error: ' + err)));
});


module.exports = router; 