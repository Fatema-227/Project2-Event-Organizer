const router = require("express").Router()

//Import controller
const invitationCtrl = require('../controller/invitation')

router.get('/', invitationCtrl.invitation_index_get)
router.get('/:eventId/new', invitationCtrl.invitation_new_get)
router.post('/', invitationCtrl.invitation_new_post)
router.get("/:eventId", invitationCtrl.invitation_show_get)

module.exports = router
