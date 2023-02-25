const express = require('express');
const mongoose = require('mongoose');
const dotv = require('dotenv').config();
const userRoute=require('./routes/UserRoutes')
const newRoute=require('./routes/NewRoutes')
const newSoruceRoute=require('./routes/NewSourceRoutes')
const categories=require('./routes/CategoryRoutes')

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


//npm init
//npm i express mongoose nodemon dotenv//2
// npm i cors
//npm install rss-parser

//middleware


app.use('/api',userRoute);
app.use('/api',newRoute);
app.use('/api',newSoruceRoute);
app.use('/api',categories);

app.get("/",(req,res)=>{
    res.send("Welcome");
})
//mongoose connect
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('Conected to mongodb')).catch((error)=>console.error(error));

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
});

