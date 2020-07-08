import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }


    useEffect(() => {
        axios.get('/api/notes')
            .then(response => {
                setNotes(response.data)
            }).catch(err => {
                console.log(err);
            })
    }, []);



    function deleteNote(id) {
        axios.delete(`/api/notes/${id}`).then(res => console.log(res.data));
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem) => {
                return noteItem._id !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem) => {   //second param index
                return (
                    <Note
                        key={noteItem._id}
                        id={noteItem._id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
