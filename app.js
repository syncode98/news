const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const ejs= require("ejs")
const port=3000
const dotenv = require("dotenv")
dotenv.config()



const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
let news=[];
let query='';

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

app.listen(3000)
app.get("/",function(req,res){
    
    newsapi.v2.topHeadlines().then(response => {
        news=response.articles})   
    res.render("home",{news:news})

})
app.get("/home",function(req,res){
    res.redirect("/")
})
app.get("/headlines",function(req,res){
    
    newsapi.v2.topHeadlines().then(response => {
        news=response.articles})   
    res.render("home",{news:news})

})
app.post("/",function(req,res){
    query=req.body.entry;
    res.redirect("/headlines")

})