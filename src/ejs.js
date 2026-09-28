const express = require('express')
const path = require('path')
const { title } = require('process')

const app = express()

//set the view engine as ejs
app.set('view engine', 'ejs')

//create a views folder and we keep the UI files there
app.set('views', path.join(__dirname, 'views'))
//set the directory for views


const products =[
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 499.99 },
    { id: 3, name: 'Tablet', price: 299.99 }
]
app.get('/',(req,res)=>{
    res.render('home',{title:'Home Page',products:products})
})

app.use(express.json())//returns middleware that only parses json and only looks at requests where the content-type header matches the type option