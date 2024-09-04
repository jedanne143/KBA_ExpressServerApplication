const express = require("express")
const app = express()
const path = require('path')
const PORT = 5000
const plantList = require('./controllers/plantList')

app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.set("view engine" , "ejs")
app.set('views' , path.join(__dirname , 'views'))

//Middleware
app.use(express.static(path.join(__dirname , 'public')))
//logs method and url
const logMiddleware = (req, res, next) => {
    console.log(`Request [method: ${req.method}] [URL: ${req.url}]`)
    next()
}
app.use(logMiddleware)
//logs date and time
app.use((req, res, next) => {
    console.log(`Date and time of access: ${new Date()}`)
    next()
})



// ROUTES
app.get('/' , (req, res) => {
    res.send("<h2>You are in the root directory</h2><h3>Try '/home'.</h3>")
}) 
app.get('/home' , (req, res) => {
    res.render("homepage")
}) 
app.get('/new' , (req, res) => {
    res.render("newplant")
}) 
app.post('/new' , (req, res) => {
    const {Plant , Genus} = req.body
    plantList.push({Plant , Genus})
    res.redirect('/plants')
})
app.get('/plants' , (req, res) => {
    res.render("index" , {plantList})
}) 
app.get('/plants/:genus' , (req,res) => {
    const {genus} = req.params
    const genus_ = genus.toLowerCase()
    const filtered = plantList.filter( p => {return p.Genus.toLowerCase() === genus_})
    if (filtered.length === 0){
        res.status(406).send(`No match found for the Genus you selected`)
    }else {
        res.render("filtered" , {genus_ , filtered })
    }
})
app.get("*", (req, res) => {
    res.status(404).send("Path doesn't exist")
})


app.listen(PORT , () => console.log("Server is running"))