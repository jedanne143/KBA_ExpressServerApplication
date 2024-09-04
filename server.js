const express = require("express")
const app = express()
const path = require('path')
const PORT = 5000

// app.use(express.urlencoded({ extended}))
// app.use(express.json())
app.set("view engine" , "ejs")
app.set('views' , path.join(__dirname , 'views'))
app.use(express.static(path.join(__dirname , 'public')))


const  plants = [
    { 
        Plant :"Serendipity Pink", 
        Genus:"Alocasia", 
        Price: "$300"
    },
    { 
        Plant :"Thai Constellation", 
        Genus:"Monstera", 
        Price: "$100"
    },
    { 
        Plant :"Adansonii Variegated", 
        Genus:"Monstera", 
        Price: "$100"
    },
    { 
        Plant :"Micans Variegated", 
        Genus:"Philodendron", 
        Price: "$150"
    }
]
// ROUTES
app.get('/' , (req, res) => {
    res.send("<h2>You are in the root</h2>")
}) 
app.get('/home' , (req, res) => {
    res.render("homepage")
}) 
app.get('/new' , (req, res) => {
    res.render("newplant")
}) 
app.get('/plants' , (req, res) => {
    res.render("index")
}) 
app.get("*", (reg, res) => {
    res.status(404).send("Path doesn't exist")
})


app.listen(PORT , () => console.log("Server is running"))