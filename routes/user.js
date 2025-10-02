const router = require('express').Router()

// Import Controller
const userCtrl = require('../controller/user')

router.get('/:userId', userCtrl.user_profile_get)
router.get('/:userId/edit', userCtrl.user_edit_get)
router.put('/:userId', userCtrl.user_update_put)

module.exports = router
