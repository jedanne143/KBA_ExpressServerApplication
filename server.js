const express = require("express")
const app = express()
const PORT = 5000

app.set("view engine" , "ejs")


// ROUTES
app.get('/' , (req, res) => {
    res.send("I am homepage requested")
}) 


app.listen(PORT , () => console.log("Server is running"))