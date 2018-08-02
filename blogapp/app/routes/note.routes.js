module.exports = (app) => {
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
}