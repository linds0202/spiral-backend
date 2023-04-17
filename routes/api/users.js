const express = require('express')
const router = express.Router()
const upload = require("../../middleware/multer")
const usersController = require('../../controllers/usersController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)

router.route('/:id')
    .get(usersController.getUser)
    .post(verifyRoles(ROLES_LIST.Admin), upload.single("file"), usersController.updateUserAvatar)

module.exports = router