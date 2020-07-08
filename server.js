const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const notes = require('./routes/api/notes');


const app = express();
const port = process.env.PORT || 5000;

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/notes', notes);

//Serve static assets if we are in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

}


app.listen(port, () => console.log(`Server started on port ${port}`));