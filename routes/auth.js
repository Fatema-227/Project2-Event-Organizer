const router = require("express").Router()

//Import controller
const authCtrl = require("../controller/auth")

//Routes
router.get("/sign-up", authCtrl.auth_signup_get)
router.post("/sign-up", authCtrl.auth_signup_post)
router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", authCtrl.auth_signin_post)
router.get("/sign-out", authCtrl.auth_signout_get)
router.get("/:id/update-password", authCtrl.auth_updatePassword_get)
router.put("/:id", authCtrl.updatePassword)

module.exports = router
