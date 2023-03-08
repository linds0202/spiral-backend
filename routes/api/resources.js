const express = require('express')
const router = express.Router()
const resourcesController = require('../../controllers/resourcesController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), resourcesController.getAllResources)
    //.get(resourcesController.getAllResources)
    .post(verifyRoles(ROLES_LIST.Admin), resourcesController.createNewResource)
    .put(verifyRoles(ROLES_LIST.Admin), resourcesController.updateResource)
    .delete(verifyRoles(ROLES_LIST.Admin), resourcesController.deleteResource)

//router.route('/new')
    

router.route('/:id')
    .get(resourcesController.getResource)

module.exports = router