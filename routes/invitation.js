const router = require("express").Router()

//Import controller
const invitationCtrl = require('../controller/invitation')

router.get('/', invitationCtrl.invitation_index_get)

module.exports = router
