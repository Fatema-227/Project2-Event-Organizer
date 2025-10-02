const router=require("express").Router()
const eventCtrl=require("../controller/event.js")
router.get("/",eventCtrl.event_index_get)
module.exports=router
