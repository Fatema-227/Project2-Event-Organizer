const router = require("express").Router()

//Import controller
const invitationCtrl = require("../controller/invitation")

router.get("/", invitationCtrl.invitation_index_get)
router.get("/:eventId/new", invitationCtrl.invitation_new_get)
router.post("/:eventId/new", invitationCtrl.invitation_new_post)
router.get("/:eventId", invitationCtrl.invitation_show_get)
router.get("/:eventId", invitationCtrl.invitation_delete_delete)
router.get("/edit/:invitationId", invitationCtrl.invitation_edit_get)
router.put("/edit/:invitationId", invitationCtrl.invitation_edit_put)

module.exports = router
