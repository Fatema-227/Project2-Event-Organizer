const express = require("express")
const router = express.Router()
const userEventCtrl = require("../controller/userEventCtrl")

router.get("/event", userEventCtrl.getAllEvents)
router.get("/ids", userEventCtrl.userEvent_ids_get)
router.post("/role", userEventCtrl.userEvent_role_post)
router.get("/edit/:id", userEventCtrl.userEvent_edit_get)
router.put("/edit/:id", userEventCtrl.userEvent_update_put)

module.exports = router
