const router = require("express").Router()

//Import controller
const invitationCtrl = require('../controller/invitation')

router.get('/:eventId/new', invitationCtrl.invitation_new_get)
router.post('/', invitationCtrl.invitation_new_post)

module.exports = router
