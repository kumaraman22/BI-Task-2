const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require('./models/article')
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const app = express();

mongoose.connect('mongodb://localhost/bharatInternDatabase'); 
app.set("views", "./view")
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res)=>{

    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles:articles})

    // const articles = [{
    //     title: 'Test Articles-1',
    //     createdAt : new Date(),
    //     description: 'Test description'
    
    // },  
    // {  
    //     title: 'Test Articles-2',
    //     createdAt : new Date(),
    //     description: 'Test description'
    
    // }]

}) 

app.use('/articles', articleRouter);

app.listen(3000);   