const User = require('../models/User')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(204).json({ 'message': 'No users found' })
    res.json(users)
}

const updateUser = async (req, res) => {

    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const user = await User.findOne({ _id: req.body.id }).exec()

    if (!user) {
        return res.status(204).json({ "message": `No user matches ID: ${req.body.id}` });
    }

    if (req.body?.updateFavResources) user.favResources = req.body.updateFavResources.filter(n => n);
    
    const result = await user.save()
    
    res.json(result)
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' })
    const user = await User.findOne({ _id: req.body.id }).exec()
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` })
    }
    const result = await user.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' })
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` })
    }
    res.json(user)
}

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser
}