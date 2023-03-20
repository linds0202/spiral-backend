const MGoal = require('../models/MGoal')
const User = require('../models/User')

const getAllMGoals = async (req, res) => {

    const mgoals = await MGoal.find()

    if (!mgoals) return res.status(204).json({ 'message': 'No monthly goals found.' })
    res.json(mgoals)
}

const createNewMGoal = async (req, res) => {

    console.log(req.body)

    if (!req?.body?.title || !req?.body?.text) {
        return res.status(400).json({ 'message': 'Title and text are required' })
    }

    const user = await User.findById(req.body.id).exec()
    try {
        const result = await MGoal.create({
            user: user._id,
            title: req.body.title,
            text: req.body.text,
        })

        //console.log(`what returned ${result}`)

        res.status(201).json(result)

    } catch(err) {
        console.error(err)
    }
}

const updateMGoal = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const mgoal = await MGoal.findOne({ _id: req.body.id }).exec()
    console.log(`found the motnhly goal to update ${mgoal}`)
    
    
    if (!mgoal) {
        return res.status(204).json({ "message": `No monthly goal matches ID: ${req.body.id}` });
    }

    if (req.body?.title) mgoal.title = req.body.title;
    if (req.body?.text) mgoal.text = req.body.text;
    
    const result = await mgoal.save()
    
    res.json(result)
}

const deleteMGoal = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })

    const mgoal = await MGoal.findOne({ _id: req.body.id }).exec()

    if (!mgoal) {
        return res.status(204).json({ "message": `No monthly goal matches ID: ${req.body.id}` })
    }

    const result = await MGoal.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getMGoal = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const mgoal = await MGoal.findOne({ _id: req.params.id }).exec()

    if (!mgoal) {
        return res.status(204).json({ "message": `No monthly goal matches ID: ${req.params.id}` })
    }

    res.json(mgoal)
}

module.exports = { 
    getAllMGoals, 
    createNewMGoal, 
    updateMGoal, 
    deleteMGoal, 
    getMGoal 
}