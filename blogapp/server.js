const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const notes = require('./app/controllers/note.controller.js');
const request = require('request');
// create app
const app = express();
// parse requests of type - app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of type app/json
app.use(bodyParser.json())
//configure DB
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connect to DB
mongoose.connect(dbConfig.url)
.then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting...');
	process.exit();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route
app.get('/', (req,res) => {
		res.render('index', { title: 'Blog Home' });
});
// create note
app.post('/notes', notes.create);
// retrieve all notes
app.get('/notes', notes.findAll);
//retrieve a single note by ID
app.get('/notes/:noteId', notes.findOne);
//update a note by noteId
app.put('/notes/:noteId', notes.update);
// delete a note with noteId
app.delete('/notes/:noteId', notes.delete);


	
// listen on port
app.listen(3000, () => {
		console.log("Server is listening on port 3000");
});