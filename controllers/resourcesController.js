const Resource = require('../models/Resource')

const getAllResources = async (req, res) => {
    const resources = await Resource.find()
    if (!resources) return res.status(204).json({ 'message': 'No resources found.' })
    res.json(resources)
}

const createNewResource = async (req, res) => {

    const { name, desc, longDesc, link, tags, tutorials } = req.body

    if (!name || !desc || !longDesc || !link || !tags) {
        return res.status(400).json({ 'message': 'All fields required' })
    }

    try {
        const result = await Resource.create({
            name: name,
            desc: desc,
            longDesc: longDesc,
            link: link,
            tags: tags,
            tutorials: tutorials
        })

        res.status(201).json(result)

    } catch(err) {
        console.error(err)
    }
}

const updateResource = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const resource = await Resource.findOne({ _id: req.body.id }).exec()

    if (!resource) {
        return res.status(204).json({ "message": `No resource matches ID: ${req.body.id}` });
    }

    if (req.body?.name) resource.name = req.body.name;
    if (req.body?.desc) resource.desc = req.body.desc;
    if (req.body?.longDesc) resource.longDesc = req.body.longDesc;
    if (req.body?.link) resource.link = req.body.link;
    if (req.body?.tags) resource.tags = req.body.tags;
    if (req.body?.tutorials) resource.tutorials = req.body.tutorials;
    
    const result = await resource.save()
    
    res.json(result)
}

const deleteResource = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'An id parameter is required' })

    const resource = await Resource.findOne({ _id: req.body.id }).exec()

    if (!resource) {
        return res.status(204).json({ "message": `No resource matches ID: ${req.body.id}` })
    }

    const result = await Resource.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getResource = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'An id parameter is required' })
    
    const resource = await Resource.findOne({ _id: req.params.id }).exec()

    if (!resource) {
        return res.status(204).json({ "message": `No resource matches ID: ${req.params.id}` })
    }

    res.json(resource)
}

module.exports = { 
    getAllResources, 
    createNewResource, 
    updateResource, 
    deleteResource, 
    getResource
}