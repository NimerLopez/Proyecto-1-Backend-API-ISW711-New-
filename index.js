const express = require('express');
const mongoose = require('mongoose');
const Token = require('jsonwebtoken');
const dotv = require('dotenv').config();
const userRoute=require('./routes/UserRoutes')
const newRoute=require('./routes/NewRoutes')
const newSoruceRoute=require('./routes/NewSourceRoutes')
const categories=require('./routes/CategoryRoutes')
const login=require('./routes/LoginRoutes')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


//npm init
//npm i express mongoose nodemon dotenv//2
// npm i cors
//npm install rss-parser
//npm install bcrypt

//middleware
 
app.use('/api',userRoute);
app.use('/api',login);
app.use(function (req, res, next) { //valida token
    const authHeader = req.headers['authorization'];//obtinen el token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autorización.' });
    }
         
    Token.verify(token, "nimer1", (err, user) => {//verifica y decodifica el token
      if (err) {
        return res.status(403).json({ message: 'Token inválido.' });
      }               
      req.user = user;// Almacena el usuario en el objeto de solicitud para su uso posterior
      console.log(req.user);
      next();
    });
});
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

