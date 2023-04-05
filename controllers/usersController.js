const User = require('../models/User')
const cloudinary = require("../middleware/cloudinary");

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

const updateUserAvatar = async (req, res) => {
    //console.log(req.body)
    try {
        //current product
        const currentUser = await User.findById(req.params.id);
        console.log(currentUser)

        const data = {
            username: currentUser.username,
            email: currentUser.email,
            password: currentUser.password,
            roles: currentUser.roles,
            favResources: currentUser.favResources,
            cloudinaryId: currentUser.cloudinaryId,
            imageUrl: currentUser.imageUrl,
            refreshToken: currentUser.refreshToken
        }

        // // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.body.file);

        // console.log(result)


        //modify image conditionnally
        if (currentUser.cloudinaryId !== '') {
            const ImgId = currentUser.cloudinaryId;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }
        }

        const newImage = await cloudinary.uploader.upload(req.body.file, {
            width: 200,
            crop: "scale"
        });

        data.imageUrl = newImage.secure_url
        data.cloudinaryId = newImage.public_id

        console.log(data)

        const userUpdate = await User.findOneAndUpdate(req.params.id, data, { new: true })

        console.log(userUpdate)

        res.status(200).json({
            success: true,
            userUpdate
        })


    } catch (error) {
        console.log(error);
    }
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
    updateUserAvatar,
    deleteUser,
    getUser
}