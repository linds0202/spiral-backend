const User = require('../models/User')
const Resource = require('../models/Resource')
const asyncHandler = require('express-async-handler')

// @desc Get all resources
// @route GET /resources
// @access Private
const getAllResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find().lean()

    if (!resources?.length) {
        return res.status(400).json({ message: 'No resources found' })
    }
    res.json(resources)
})

// @desc Create new resource
// @route Post /resources
// @access Private
const createNewResource = asyncHandler(async (req, res) => {
    
    const { name, desc, link, tags, tutorials } = req.body

    console.log(tutorials)

    //Check data
    if (!name || !desc || !link || !tags) {
        return res.status(400).json({ message: 'All fields required' })
    }

    //Check for duplicate
    const duplicate = await Resource.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate resource title' })
    }

    //Create & store the new resource
    const resourceObject = { name, desc, link, tags, tutorials }
    
    const resource = await Resource.create(resourceObject)

    if (resource) {
        return res.status(201).json({ message: `New resource ${name} created` })
    } else {
        return res.status(400).json({ message: 'Invalid resource data received' })
    }
})

// @desc Update resource
// @route PATCH /resources
// @access Private
const updateResource = asyncHandler(async (req, res) => {
    const { id, name, desc, link, tags, tutorials } = req.body


    //Comfirm data
    if (!id || !name || !desc || !link || !Array.isArray(tags) || !tags.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Confirm resource exists to update
    const resource = await Resource.findById(id).exec()

    if (!resource) {
        return res.status(400).json({ message: 'Resource not found' })
    }

    //Check for duplicate
    const duplicate = await Resource.findOne({ name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original resource 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate resource name' })
    }

    resource.name = name
    resource.desc = desc
    resource.link = link  
    resource.tags = tags 
    resource.tutorials = tutorials 

    const updatedResource = await resource.save()

    res.json({ message: `${updatedResource.name} updated` })
})

// @desc Delete resource
// @route DELETE /resources
// @access Private
const deleteResource = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Resource ID required' })
    }

    const resource = await Resource.findById(id).exec()

    if (!resource) {
        return res.status(400).json({ message: 'Resource not found' })
    }

    const result = await resource.deleteOne()

    const reply = `Note ${result.name} with Id ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllResources,
    createNewResource,
    updateResource,
    deleteResource
}