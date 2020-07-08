const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const NoteSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = Note = mongoose.model('Note', NoteSchema);