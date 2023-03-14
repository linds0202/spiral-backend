const express = require('express')
const router = express.Router()
const mgoalsController = require('../../controllers/mgoalsController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), mgoalsController.getAllMGoals)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), mgoalsController.createNewMGoal)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), mgoalsController.updateMGoal)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), mgoalsController.deleteMGoal)

router.route('/:id')
    .get(mgoalsController.getMGoal)

module.exports = router