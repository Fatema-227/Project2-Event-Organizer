const express = require("express")
const router = express.Router()

// Import Controller
const userCtrl = require("../controller/user")
const upload = require("../middleware/upload")

router.get("/:userId", userCtrl.user_profile_get)
router.get("/:userId/edit", userCtrl.user_edit_get)

//update username,email and password
router.put("/:userId/edit", userCtrl.user_update_put)

//update profile picture
router.put("/:userId/update-picture", upload.single("picture"), userCtrl.user_update_picture)


// router.get("/:userId/edit", userCtrl.update_password)
// // router.put("/:userId", userCtrl.update_password)
// router.get("/:userId/edit", userCtrl.user_profile_get)
// router.put("/:userId/edit",upload.single("picture"), userCtrl.user_profile_put)
// router.post("/:userId/edit",upload.single("picture"),userCtrl.user_profile_post)
// router.get("/:id", userCtrl.getUserById)

module.exports = router
