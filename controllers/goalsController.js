const Goal = require('../models/Goal')

const getAllGoals = async (req, res) => {
    const goals = await Goal.find()
    if (!goals) return res.status(204).json({ 'message': 'No goals found.' })
    res.json(goals)
}

const createNewGoal = async (req, res) => {
    if (!req?.body?.title || !req?.body?.text) {
        return res.status(400).json({ 'message': 'Title and text are required' })
    }

    try {
        const result = await Goal.create({
            title: req.body.title,
            text: req.body.text,
            //user: (authContext?)
        })

        res.status(201).json(result)

    } catch(err) {
        console.error(err)
    }
}

const updateGoal = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const goal = await Goal.findOne({ _id: req.body.id }).exec()

    if (!goal) {
        return res.status(204).json({ "message": `No goal matches ID: ${req.body.id}` });
    }

    if (req.body?.title) goal.title = req.body.title;
    if (req.body?.text) goal.text = req.body.text;
    //assign user from auth Provider context??  goal.user: auth provider context
    
    const result = await goal.save()
    
    res.json(result)
}

const deleteGoal = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })

    const goal = await Goal.findOne({ _id: req.body.id }).exec()

    if (!goal) {
        return res.status(204).json({ "message": `No goal matches ID: ${req.body.id}` })
    }

    const result = await Goal.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getGoal = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const goal = await Goal.findOne({ _id: req.params.id }).exec()

    if (!goal) {
        return res.status(204).json({ "message": `No goal matches ID: ${req.params.id}` })
    }

    res.json(goal)
}

module.exports = { 
    getAllGoals, 
    createNewGoal, 
    updateGoal, 
    deleteGoal, 
    getGoal 
}