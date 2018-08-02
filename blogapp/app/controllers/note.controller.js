const Note = require('../models/note.model.js');

// Create and save a new Note
exports.create = (req, res) => {
	//validate
	if(!req.body.content) {
		return res.status(400).send({
			message: "Note content cannot be empty"
		});
	}
	// create Note
	const note = new Note({
		title: req.body.title, 
		content: req.body.content
	});	
	//save Note to DB
	note.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while creating note."
		});
	});
};

// return all Notes from DB
exports.findAll = (req, res) => {
	Note.find()
	.then(notes => {
		res.send(notes);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving notes."
		});
	});
};
// return one Note from DB
exports.findOne = (req, res) => {
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note) {
			return res.status(404).send({
			message: "Note not found with id " + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
			message: "Note not found with id " + req.params.noteId
			});
		}
		return res.status(500).send({
		message: "Error retrieving note with id " + req.params.noteId
		});
	});	
};
// update a note by ID
exports.update = (req, res) => {
	// validate
	if(!req.body.content) {
		return res.status(400).send({
			message: "Note content cannot be empty"
		});
	}	
	//find note/update with request body
	Note.findByIdAndUpdate(req.params.noteId, {
		title:req.body.title || "Untitled Note",
		content: req.body.content
	}, {new: true})
	.then(note => {
		if(!note) {
			return res.status(404).send({
			message: "Note not found with id " + req.params.noteId
			});
		}
			res.send(note);
		}).catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
				message: "Note not found with id " + rep.params.noteId
				});
			}
			return res.status(500).send({
				message: "error updating note with id " + req.params.noteId
			});
		});
};
// delete a note by Id
exports.delete = (req, res) => {
	Note.findByIdAndRemove(req.params.noteId)
	.then(note => {
		if(!note) {
			return res.staus(404).send({
			message: "Note not found with id " + req.params.noteId
			});
		}
		res.send({message: "Note deleted successfully!"});
	}).catch(err => {
		if(err.kind ==='ObjectId' || err.name ==='NotFound') {
			return res.status(404).send({
			message: "Note not found with id " + req.params.noteId});
		}
		return res.status(500).send({
		message: "Could not delete not with id " + req.params.noteId});
	});		
};