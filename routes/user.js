const express = require("express")
const router = express.Router()

// Import Controller
const userCtrl = require("../controller/user")
const upload=require("../middleware/upload")

router.get("/:userId", userCtrl.user_profile_get)
router.get("/:userId/edit", userCtrl.user_edit_get)
router.put("/:userId", userCtrl.user_update_put)
//router.get("/:userId/edit", authCtrl.user_profile_get)
//router.post("/:userId/edit",upload.single("picture"), authCtrl.user_profile_post)
router.post("/:userId/edit",upload.single("picture"), userCtrl.user_profile_post)
// router.get("/:id", userCtrl.getUserById)
router.put("/:userId/edit", userCtrl.update_password)


module.exports = router
