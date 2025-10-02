const express=require("express")
const app=express()
app.use(express.urlencoded())

require("dotenv").config()

const mongoose=require("./config/db")

const methodOverride=require("method-override")
app.use(methodOverride("_method"))

const morgan=require("morgan")
app.use(morgan("dev"))

const session=require("express-session")
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// const passUserToView=require("./middleware/pas-user-to-view")
// app.use(passUserToView)

// const isSignedIn = require("./middleware/is-signed-in")

const authRouter=require("./routes/auth")
app.use("/auth",authRouter)

// const listenRouter=require("./routes/listing")
// app.use("/listings",isSignedIn, listenRouter)

app.get("/",(req,res)=>{
  res.render("index.ejs")
})
// app.get("/vip-lounge",isSignedIn,(req,res)=>{
//   res.send(`Welcome to the party ${req.session.user.username}`)
// })

const port=process.env.PORT ? process.env.PORT:"3000"
app.listen(port,()=>{
console.log("app is listening")
})
