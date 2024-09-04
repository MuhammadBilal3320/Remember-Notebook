const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");




// =================================>  ADD NOTE EndPoint Starting <=====================================
// Create a User  using: POST "/api/notes/addNote" . require Authentication
router.post('/addNote', fetchUser, [
    body('title', "title must be at Least 3 characters").isLength({ min: 3 }),
    body('description', "Description Not be Blank!").isLength({ min: 1 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) { //----------------------> Checking if error found user cannot  be created
        return res.status(400).json({ errors: result.array() }); // --> if error found message send
    }

    try {
        const { title, description, tag } = req.body;// ------------> Destructuring data from req.body for easiness access

        const createNote = new Note({ user: req.user.id, title, description, tag }) // --------->  Creating a new user object with data from req.body

        await createNote.save();
        res.send(createNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// =================================>  ADD NOTE EndPoint Ending <=====================================


// =================================>  FETCH ALL NOTES Starting <=====================================
// Create a User  using: GET "/api/notes/fetchAllNotes" . require Authentication
router.get('/fetchAllNotes', fetchUser, async (req, res) => {

    try {

        const fetchNotes = await Note.find({ user: req.user.id }); //------>  find all notes of user
        res.json(fetchNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// =================================>  FETCH ALL NOTES EndPoint Ending <=====================================


// =================================>  UPDATE  NOTE Starting <=====================================
// Create a User  using: PUT "/api/notes/updateNote" . require Authentication
router.put('/updateNote/:id', fetchUser, [
    body('title', "title must be at Least 3 characters").isLength({ min: 3 }),
    body('description', "Description Not be Blank!").isLength({ min: 1 }),
], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) { //----------------------> Checking if error found user cannot  be created
        return res.status(400).json({ errors: result.array() }); // --> if error found message send
    }

    try {

        const  { title, description, tag } = req.body;// ------------> Destructuring data from req.body

        const newNote = {};  // ------>  creating a new object to store updated data


        if(title){newNote.title = title;} //------------------------|
        if(description){newNote.description = description;}//-------|---->   if title or description is not empty then update note
        if(tag){newNote.tag = tag;}//-------------------------------|
        
        let updateNote = await Note.findById(req.params.id); //  ------>  find note by id
        if(!updateNote){return res.status(404).json({ msg: "Note Not Found!"})};  // ------>  if note not found send message

        if (updateNote.user.toString() !== req.user.id){return res.status(404).json({ msg: "Not Allowed! 🤬"})}; // --->  if note not belong to user send message

        updateNote = await  Note.findByIdAndUpdate(req.params.id, {$set: newNote}, { new: true }); // ------>  update note
        res.json(updateNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// =================================>  UPDATE NOTE EndPoint Ending <=====================================


// =================================>  DELETE  NOTE Starting <=====================================
// Create a User  using: DELETE "/api/notes/deleteNote" . require Authentication
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {

        const  { title, description, tag } = req.body;// ------------> Destructuring data from req.body

        let deleteNote = await Note.findById(req.params.id); //  ------>  find note by id
        if(!deleteNote){return res.status(404).json({ msg: "Note Not Found!"})};  // ------>  if note not found send message

        if (deleteNote.user.toString() !== req.user.id){return res.status(404).json({ msg: "Not Allowed! 🤬"})}; // --->  Allow deletion if user own this note

        deleteNote = await  Note.findByIdAndDelete(req.params.id); // ------>  update note
        res.json("Deleted Successfully!😙")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please Try Again Later!");//-----> throw error  if any  error occur 
    }

})
// =================================>  DELETE NOTE EndPoint Ending <=====================================

module.exports = router;