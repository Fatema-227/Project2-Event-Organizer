const express = require("express")
const router = express.Router()

// Import Controller
const userCtrl = require("../controller/user")

router.get("/:userId", userCtrl.user_profile_get)
router.get("/:userId/edit", userCtrl.user_edit_get)
router.put("/:userId", userCtrl.user_update_put)
// router.get("/:id", userCtrl.getUserById)
router.put("/:userId/edit", userCtrl.update_password)

module.exports = router
