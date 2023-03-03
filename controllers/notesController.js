const Note = require('../models/Note')

const getAllNotes = async (req, res) => {
    const notes = await Note.find()
    if (!notes) return res.status(204).json({ 'message': 'No notes found.' })
    res.json(notes)
}

const createNewNote = async (req, res) => {
    if (!req?.body?.title || !req?.body?.text) {
        return res.status(400).json({ 'message': 'Title and text are required' })
    }

    try {
        const result = await Note.create({
            title: req.body.title,
            text: req.body.text,
            //user: (authContext?)
        })

        res.status(201).json(result)

    } catch(err) {
        console.error(err)
    }
}

const updateNote = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const note = await Note.findOne({ _id: req.body.id }).exec()

    if (!note) {
        return res.status(204).json({ "message": `No note matches ID: ${req.body.id}` });
    }

    if (req.body?.title) goal.title = req.body.title;
    if (req.body?.text) goal.text = req.body.text;
    //assign user from auth Provider context??  goal.user: auth provider context
    
    const result = await note.save()
    
    res.json(result)
}

const deleteNote = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })

    const note = await Note.findOne({ _id: req.body.id }).exec()

    if (!note) {
        return res.status(204).json({ "message": `No note matches ID: ${req.body.id}` })
    }

    const result = await Note.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getNote = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const note = await Note.findOne({ _id: req.params.id }).exec()

    if (!note) {
        return res.status(204).json({ "message": `No note matches ID: ${req.params.id}` })
    }

    res.json(note)
}

module.exports = { 
    getAllNotes, 
    createNewNote, 
    updateNote, 
    deleteNote, 
    getNote
}