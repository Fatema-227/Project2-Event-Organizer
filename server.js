require("dotenv").config()
const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const passUserToView = require('./middleware/pass-user-to-view')
const isSignIn = require("./middleware/is-signed-in")

const app = express()

// Database configurations
const mongoose = require("./config/db")

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000"

// Use MiddleWare
app.use(express.urlencoded())
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)

// rout route
app.get("/", async (req, res) => {
  res.render("index.ejs")
})


// Require Routes
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const user_eventRouter=require("./routes/userEventCtrl")
const eventRouter=require("./routes/event")
const invitationRouter=require("./routes/invitation")

// Use Router
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/userEvent",user_eventRouter)
app.use("/events",eventRouter)
app.use("/invitations", invitationRouter )


app.listen(port, (req, res) => {
  console.log(`The server is ready on port ${port}`)
})
