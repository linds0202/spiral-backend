const express = require('express')
const router = express.Router()
const goalsController = require('../../controllers/goalsController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), goalsController.getAllGoals)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), goalsController.createNewGoal)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), goalsController.updateGoal)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Enrolled), goalsController.deleteGoal)

router.route('/:id')
    .get(goalsController.getGoal)

module.exports = router