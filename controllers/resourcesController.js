const Resource = require('../models/Resource')

const getAllResources = async (req, res) => {
    console.log('getting the resources')
    const resources = await Resource.find()
    console.log(`returning resources: ${resources}`)
    if (!resources) return res.status(204).json({ 'message': 'No resources found.' })
    res.json(resources)
}

const createNewResource = async (req, res) => {
    const { name, desc, longDesc, link } = req.body

    console.log(name)
    console.log(desc)
    console.log(longDesc)
    console.log(link)

    if (!name || !desc || !longDesc || !link ) {
        return res.status(400).json({ 'message': 'All fields required' })
    }

    try {
        const result = await Resource.create({
            name: name,
            desc: desc,
            longDesc: longDesc,
            link: link,
        })
        console.log('created resource')
        res.status(201).json(result)

    } catch(err) {
        console.log('errored out here')
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