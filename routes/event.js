const router=require("express").Router()
const eventCtrl=require("../controller/event.js")
router.get("/",eventCtrl.event_index_get)
router.get("/new",eventCtrl.event_new_get)
router.post("/",eventCtrl.event_new_post)
module.exports=router
