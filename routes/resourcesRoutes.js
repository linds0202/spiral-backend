const express = require('express')
const router = express.Router()
const resourcesController = require('../controllers/resourcesController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(resourcesController.getAllResources)
    .post(resourcesController.createNewResource)
    .patch(resourcesController.updateResource)
    .delete(resourcesController.deleteResource)

module.exports = router