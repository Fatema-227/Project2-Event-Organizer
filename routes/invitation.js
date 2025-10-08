const router = require("express").Router()

//Import controller
const invitationCtrl = require('../controller/invitation')

router.get('/', invitationCtrl.invitation_index_get)
router.get('/new/:eventId', invitationCtrl.invitation_new_get)
router.post('/', invitationCtrl.invitation_new_post)
router.get("/:invitationId", invitationCtrl.invitation_show_get)
router.get('/edit/:invitationId', invitationCtrl.invitation_edit_get)
router.put('/edit/:invitationId', invitationCtrl.invitation_edit_put)
router.delete("/:invitationId", invitationCtrl.invitation_delete_delete)
router.delete("/:invitationId", invitationCtrl.invitation_delete_delete)

router.get("/showguest/:invitationId", invitationCtrl.invitation_show_guest_get)
router.post("/showguest/:invitationId", invitationCtrl.invitation_show_guest_post)

router.get("/", invitationCtrl.invitation_send_get)
router.post("/:invitationId", invitationCtrl.invitation_send_post)

router.delete("/:invitationId/:guestId", invitationCtrl.invitation_guest_delete)


module.exports = router
